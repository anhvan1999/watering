import { combineReducers } from 'redux';
import sensor from './reducers/sensor-reducer';
import user from './reducers/user-reducer';
import ui from './reducers/ui-reducer';

export default combineReducers({
    user,
    sensor,
    ui
});
