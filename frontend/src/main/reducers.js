import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";

import TabReducer from "../common/tab/tabReducer";
import AuthReducer from "../auth/authReducer";
import UsersReducer from "../users/usersReducer";

const rootReducer = combineReducers({
  tab: TabReducer,
  users: UsersReducer,
  form: formReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
});

export default rootReducer;
