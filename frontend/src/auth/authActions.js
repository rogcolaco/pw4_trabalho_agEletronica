import { toastr } from "react-redux-toastr";
import axios from "axios";
import consts from "../consts";

export function login(values) {
  return submit(values, `${consts.API_URL}/login`);
}

export function signup(values) {
  values.admin = 0;
  return submit(values, `${consts.API_URL}/adicionarUsuario`);
}

export function logout() {
  return { type: "TOKEN_VALIDATED", payload: false };
}

function submit(values, url) {
  return (dispatch) => {
    axios
      .post(url, values)
      .then((resp) => {
        dispatch([{ type: "USER_FETCHED", payload: resp.data }]);
      })
      .catch((e) => {
        if (e.response.status == 409) {
          if (
            typeof e.response.data != "string" &&
            e.response.data.length > 0
          ) {
            e.response.data.forEach((error) => toastr.error("Erro", error.msg));
          }
          if (typeof e.response.data == "string") {
            toastr.error("Erro", e.response.data);
          }
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
        }
      });
  };
}

export function validateToken(token) {
  return (dispatch) => {
    if (token) {
      axios
        .post(`${consts.API_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: "TOKEN_VALIDATED", payload: resp.data });
        })
        .catch((e) => dispatch({ type: "TOKEN_VALIDATED", payload: false }));
    } else {
      dispatch({ type: "TOKEN_VALIDATED", payload: false });
    }
  };
}
