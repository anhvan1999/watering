import { combineReducers } from 'redux';
import sensor from './reducers/sensor-reducer';
import user from './reducers/user-reducer';
import ui from './reducers/ui-reducer';
import motor from './reducers/motor-reducer';
import userinfo from './reducers/userinfo-reducer'

export default combineReducers({
    user,
    sensor,
    ui,
    motor,
    userinfo
});
