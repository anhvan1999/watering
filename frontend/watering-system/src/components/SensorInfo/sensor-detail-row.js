import React from 'react';
import style from './sensorInfo.scss';

function formatDate(d){
    return [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
}

export default function SensorDetailRow(props){
    return(
        <tr>
            <td>{formatDate(props.time)}</td>
            <td>{props.measure}</td>
            <td>{props.state(props.measure)}</td>
        </tr>
    )
} 