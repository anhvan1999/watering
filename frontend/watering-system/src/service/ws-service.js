import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import store from '../redux-store/store';
import { takeDataSensor } from '../redux-store/actions/sensor-actions';

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
        store.dispatch(takeDataSensor(sensorData));
        console.log("sensor", new Date(sensorData.publishTime));
    });

    send({
        deviceId: 'Speaker',
        value: 2222
    }, '/app/motor/control');
});

function send(dataObject, topic) {
    stompClient.send(topic, {}, JSON.stringify(dataObject));
}

export default stompClient;
