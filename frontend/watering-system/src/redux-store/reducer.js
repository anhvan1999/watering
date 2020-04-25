import { combineReducers } from 'redux';
import sensor from './reducers/sensor-reducer';
import user from './reducers/user-reducer';

export default combineReducers({
    user,
    sensor
});
