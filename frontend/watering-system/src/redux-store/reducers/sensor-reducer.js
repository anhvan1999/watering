import {actionTypes} from '../actions/sensor-actions'

function objectsensor (deviceid,data){
    this.deviceid = deviceid
    this.data = data
}
var ob = new objectsensor("","");
let defaultState = [
    ob
];

function sensorReducer(state = defaultState, action) {
    
    if (action.type === actionTypes.TAKE_DATA_SENSOR) {
        var i;
        var found = false;
        for (i=0;i < state;i++){
            if (action.data.sensor.deviceId === state[i].deviceid){
                state[i].deviceid = action.data;
                found= true;
                break;
            }
        }
        if (!found) 
        {   
            var obj = new objectsensor(action.data.sensor.deviceId,action.data)
            state.push(obj);
        }
    }
   
    return state;
}

export default sensorReducer;
