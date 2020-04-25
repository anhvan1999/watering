import {actionTypes} from '../actions/user-actions';

let defaultState = {
    username: 'Coder Team',
    jwtToken: ''
};

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        default:
            return state;
    }
}

export default userReducer;
