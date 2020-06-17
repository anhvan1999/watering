import {actionTypes} from '../actions/sensor-actions'

function objectsensor (deviceid,data) {
    this.deviceid = deviceid
    this.data = data
}

let defaultState = [];

function sensorReducer(state = defaultState, action) {
    if (action.type === actionTypes.TAKE_DATA_SENSOR) {
        state = state.slice();
        let found = false;
        for (let i = 0; i < state.length; i++) {
            if (action.data.sensor.deviceId == state[i].deviceid){
                state[i].data = action.data;
                found= true;
                break;
            }
        }
        if (!found) 
        {   
            let obj = new objectsensor(action.data.sensor.deviceId, action.data);
            state.push(obj);
        }
    }
   
    return state;
}

export default sensorReducer;
