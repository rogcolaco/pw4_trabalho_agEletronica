const INITIAL_STATE = { contactsList: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CONTACTS_LIST_FETCHED":
      return { ...state, contactsList: action.payload.data };
    default:
      return state;
  }
};
