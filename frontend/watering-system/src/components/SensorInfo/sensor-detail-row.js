import React from 'react';
import style from './sensorInfo.scss';

export default function SensorDetailRow(props){
    return(
        <tr>
            <td>{props.time}</td>
            <td>{props.measure}</td>
            <td>{props.state}</td>
        </tr>
    )
} 