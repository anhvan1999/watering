import {actionTypes} from '../actions/user-actions';

let defaultState = {
    username: sessionStorage.getItem("username"),
    jwtToken: sessionStorage.getItem("jwtToken"),
    jwtRefreshToken: ''
};

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                username: action.username,
                jwtToken: action.token,
                jwtRefreshToken: action.refreshToken
            };
        
        case actionTypes.LOGOUT_USER:
            return defaultState;

        default:
            return state;
    }
}

export default userReducer;
