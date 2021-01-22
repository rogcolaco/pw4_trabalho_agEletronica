const INITIAL_STATE = {usersList: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS_LIST_FETCHED':
            return { ...state, usersList: action.payload.data }
        default:
            return state
    }
}