const INITIAL_STATE = { appointmentList: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "APPOINTMENT_LIST_FETCHED":
      let list = action.payload.data;
      if (list.length > 0) {
        list.map((item) => {
          item.data = item.data.split(".")[0];
        });
      }
      return { ...state, appointmentList: list };
    default:
      return state;
  }
};
