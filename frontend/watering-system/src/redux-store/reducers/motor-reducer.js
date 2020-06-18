import {actionTypes} from '../actions/motor-actions'

function objectmotor (motorid,data) {
    this.motorid = motorid
    this.data = data
}

let defaultState = [];

function motorReducer(state = defaultState, action) {
    if (action.type === actionTypes.TAKE_DATA_MOTOR) {
        state = state.slice();
        let found = false;
        for (let i = 0; i < state.length; i++) {
            if (action.data.motor.deviceId == state[i].motorid){
                state[i].data = action.data;
                found= true;
                break;
            }
        }
        if (!found) 
        {   
            let obj = new objectmotor (action.data.motor.deviceId, action.data);
            state.push(obj);
        }
    }
   
    return state;
}

export default motorReducer;
