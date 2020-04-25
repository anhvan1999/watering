import {actionTypes} from '../actions/ui-actions';

let initialState = {
    sideBarActive: false
}

export default function uxReducer(state = initialState, action) {
    if (action.type === actionTypes.TOGGLE_SIDEBAR) {
        return {
            ...state,
            sideBarActive: !state.sideBarActive
        }
    }
    return state;
}