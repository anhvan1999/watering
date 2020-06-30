import React from 'react';
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
