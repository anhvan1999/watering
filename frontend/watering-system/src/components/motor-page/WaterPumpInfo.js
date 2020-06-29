import React from 'react';
import {connect} from 'react-redux';
import axios from '../../utils/axios-instance';
import style from './waterPump.scss';

class WaterPumpInfo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="list-moto-info">
            <h1>Cảm biến
                 {/* {this.props.name} */}
                 </h1>
            <Link id= "turn-back" className ="btn btn-outline-info" to={'/app/sensor'}>Quay về</Link>
            <h4>Số đo hiện tại: {this.state.currentValue}</h4>
            <CanvasJSChart options = {options}></CanvasJSChart>
            <table className="table table-hover table-detail">
                <thead className="thead-light">
                    <tr>
                        <th>Thời gian</th>
                        <th>Số đo</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.reverse().map(data => {
                            return (<SensorDetailRow time = {data.x} measure = {data.y} state={this.considerState}></SensorDetailRow>);
                        })
                    }
                </tbody>
            </table>
        </div> 
        );
    }
}
export default WaterPumpInfo