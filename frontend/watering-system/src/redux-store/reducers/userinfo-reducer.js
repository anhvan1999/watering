import {actionTypes} from '../actions/userinfo-actions';
let defaultState = [];
function userInfoReducer(state = defaultState,action){
    switch(action.type){
        case actionTypes.HISTORY_LIST:
            return Object.assign(
                {},
                state,
                {
                    username:action.username
                }
            );
        default:
            return state;
    }
}

export default userInfoReducer;