import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


let sock = new SockJS(process.env.REACT_APP_API_ROOT + '/stomp');
let stompClient = Stomp.over(sock);

stompClient.connect({}, frame => {
    console.log("connected", frame);

    stompClient.subscribe("/topic/info", data => {
        console.log("receive", data);
    });

    stompClient.subscribe("/topic/sensor", data => {
        console.log("receive", data);
    });

    for (let i = 0; i < 2; ++i) {
        stompClient.send("/app/info", {}, "");
    }

});

function send(msg) {
    stompClient.send("/app/info", {}, JSON.stringify({
        msg
    }));
}

console.log('RUNNN');

export default stompClient;
