import React from 'react';
import { Link } from 'react-router-dom';
function formatDate(d){
    return [d.getDate(),
        d.getMonth()+1,
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
}
export default function MotorDetailRow(props) {
    return (
        <tr>
            <td>{formatDate(props.time)}</td>
            <td>{props.value}</td>                     
            <td>{props.lower}</td>     
            <td>{props.upper}</td>     
        </tr>
    )
}
