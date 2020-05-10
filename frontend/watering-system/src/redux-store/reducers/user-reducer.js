import {actionTypes} from '../actions/user-actions';

let defaultState = {
    username: localStorage.getItem("username"),
    jwtToken: sessionStorage.getItem("jwtToken")
};

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return Object.assign({}, state, {
                username: action.username,
                jwtToken: action.token
            });
        
        case actionTypes.LOGOUT_USER:
            return Object.assign({}, state, {
                username: '',
                jwtToken: ''
            });
    
        case actionTypes.NEW_TOKEN:
            return Object.assign({}, state, {
                jwtToken: action.newToken
            });

        default:
            return state;
    }
}

export default userReducer;
