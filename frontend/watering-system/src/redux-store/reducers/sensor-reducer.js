import { actionTypes } from '../actions/sensor-actions'

function ObjectSensor(deviceId, value) {
    this.deviceId = deviceId;
    this.value = value;
}

let defaultState = [];

function sensorReducer(state = defaultState, action) {
    if (action.type === actionTypes.TAKE_DATA_SENSOR) {
        state = state.slice();
        let found = false;
        for (let i = 0; i < state.length; i++) {
            if (action.data.sensor.deviceId == state[i].deviceId) {
                state[i].value = action.data.value;
                found = true;
                break;
            }
        }
        if (!found) {
            let obj = new ObjectSensor(action.data.sensor.deviceId, action.data.value);
            state.push(obj);
        }
    }

    return state;
}

export default sensorReducer;
