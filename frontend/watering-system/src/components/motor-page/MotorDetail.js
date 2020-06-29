import React from 'react';
import {Link} from 'react-router-dom';
import style from './motordetail.scss';

class MotorDetail extends React.Component{
    render(){
        return(
            <Link className='btn btn-outline-info btn-motordetail' to={'/app/motor'}>Quay ve</Link>
        )
    }
}


export default MotorDetail;