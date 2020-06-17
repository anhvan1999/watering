import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import store from '../redux-store/store';
import { takeDataSensor } from '../redux-store/actions/sensor-actions';
import {takeDataMotor} from '../redux-store/actions/motor-actions'
// Create connection via sockjs and stompjs
const sock = new SockJS(process.env.REACT_APP_API_ROOT + '/stomp');
const stompClient = Stomp.over(sock);

// On connected
stompClient.connect({}, frame => {
    console.log("connected", frame);

    stompClient.subscribe("/topic/info", data => {
        console.log("receive", data);
    });

    stompClient.subscribe("/topic/sensor", data => {
        let sensorData = JSON.parse(data.body);
        console.log(sensorData);
        store.dispatch(takeDataSensor(sensorData));
    });

    stompClient.subscribe("/topic/motor/status", data => {
        let motorData = JSON.parse(data.body);
        console.log(motorData);
        store.dispatch(takeDataMotor(motorData));
    });

    controlMotor('Speaker', 1000);
});

function send(dataObject, topic) {
    stompClient.send(topic, {}, JSON.stringify(dataObject));
}

export function controlMotor(deviceId, value) {
    send({
        deviceId, value
    }, '/app/motor/control');
}

export default stompClient;
