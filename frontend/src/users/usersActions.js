import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080";
const INITIAL_VALUES = {};

export function getList() {
  const request = axios.get(`${BASE_URL}/listarUsuarios`);
  return {
    type: "USERS_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  return submit("adicionarUsuario", values, "post");
}

export function update(values) {
  return submit("alterarUsuario", values, "put");
}

export function remove(values) {
  console.log("value em delete: ", values);
  return submit(`excluirUsuario/${values.id}`, values, "delete");
}

function submit(url, values, method) {
  return (dispatch) => {
    const id = values.id ? values.id : null;
    values.admin = values.admin == 1 ? 1 : 0;
    // console.log("values: ", values);
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        // console.log("resp", resp);
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init());
      })
      .catch((e) => {
        // console.log('e: ', e.response)
        if (e.response.status == 409) {
          if (
            typeof e.response.data != "string" &&
            e.response.data.length > 0
          ) {
            e.response.data.forEach((error) => toastr.error("Erro", error.msg));
          }
          if (typeof e.response.data == "string") {
            console.log("entrou tipo", e.response.data);
            toastr.error("Erro", e.response.data);
          }
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
        }
      });
  };
}

export function showUpdate(user) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("usersForm", user),
  ];
}

export function showDelete(user) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("usersForm", user),
  ];
}

export function init() {
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(),
    initialize("usersForm", INITIAL_VALUES),
  ];
}
