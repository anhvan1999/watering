import React from 'react';
import { Link } from 'react-router-dom';

export default function SensorInfoRow(props) {
    return (
        <tr>
            <td>Cảm biến {props.id}</td>
            <td>{props.measure}</td>                     
            <td>{props.state(props.measure)}</td>                     
            <td><Link className="btn btn-primary btn-sensor" to={`/app/sensor/${props.id}`} onClick={()=>props.func(props.id)}></Link></td>
        </tr>
    )
}
