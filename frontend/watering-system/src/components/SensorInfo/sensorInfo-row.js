import React from 'react';
import style from './sensorInfo.scss';

export default function SensorInfoRow(props) {
    return (
        <tr>
            <td>Cảm biến {props.id}</td>
            <td>{props.measure}</td>                     
            <td>{props.state(props.measure)}</td>                     
            <td><button className="btn btn-primary btn-sensor" onClick = {() => props.func(props.id)}></button></td>
        </tr>

    )
}