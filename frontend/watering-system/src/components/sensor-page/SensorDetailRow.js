import React from 'react';

function formatDate(d){
    return [d.getDate(),
        d.getMonth()+1,
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