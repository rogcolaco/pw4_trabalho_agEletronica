import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../common/tab/tabActions";

const BASE_URL = "http://localhost:8080";
const INITIAL_VALUES = {};

export function getList(userId) {
  console.log("userId: ", userId);
  const request = axios.get(`${BASE_URL}/meusContatos/${userId}`);
  return {
    type: "CONTACTS_LIST_FETCHED",
    payload: request,
  };
}

export function create(values) {
  console.log("value em create: ", values);
  values.user_id = JSON.parse(localStorage.getItem("agenda_user")).id;
  console.log("value em create depois: ", values);
  return submit("adicionarContato", values, "post");
}

export function update(values) {
  return submit("alterarContato", values, "put");
}

export function remove(values) {
  console.log("value em delete: ", values);
  return submit(`excluirContato/${values.id}`, values, "delete");
}

function submit(url, values, method) {
  return (dispatch) => {
    var userId = values.user_id;
    const id = values.id ? values.id : null;
    console.log("values.user_id ?: ", values.user_id);
    console.log("values em submit: ", values);
    axios[method](`${BASE_URL}/${url}`, values)
      .then((resp) => {
        // console.log("resp", resp);
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        dispatch(init(userId));
      })
      .catch((e) => {
        console.log("e: ", e.response);
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
          dispatch(init(userId));
        } else {
          toastr.error("Erro", "Não foi possível atender a requisição!");
          dispatch(init(userId));
        }
      });
  };
}

export function showUpdate(contact) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("contactsForm", contact),
  ];
}

export function showDelete(contact) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("contactsForm", contact),
  ];
}

export function init(userId) {
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(userId),
    initialize("contactsForm", INITIAL_VALUES),
  ];
}
