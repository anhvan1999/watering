import {actionTypes} from '../actions/ui-actions';

let initialState = {
    sideBarActive: false,
    sideBarFirstRender: true
}

export default function uiReducer(state = initialState, action) {
    if (action.type === actionTypes.TOGGLE_SIDEBAR) {
        return {
            ...state,
            sideBarActive: !state.sideBarActive,
            sideBarFirstRender: false
        }
    }
    return state;
}