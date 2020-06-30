import React from 'react';
import SensorDetailRow from './sensor-detail-row.js';
import {Link} from 'react-router-dom';
import axios from '../../utils/axios-instance';

import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class SensorDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            data: [
            ],
            currentValue: 0,
        }
        this.setDataToState = this.setDataToState.bind(this);
        this.considerState = this.considerState.bind(this);
    }

    considerState = (value) =>{
        if (value >= 700){
            return "Ẩm";
        }
        if (value >=450 && value < 700){
            return "Bình thường";
        }
        return "Khô";
    }

    setDataToState = (data) =>{
        console.log(data);
        var _data = data
            .filter(detail => detail.sensor.deviceId === this.state.name)
            .map(detail => {
                return {
                    x: new Date(detail.publishTime),
                    y: detail.value
                }
            })
        this.setState({
            data: _data
        })
        console.log(_data);
    }

    componentDidMount() {
        axios.get('/sensordetail/list')
        .then(data => {
            console.log(data);
            for (var i=0;i<data.data.length;i++){
                if (data.data[i].sensor.deviceId === this.state.name){
                    this.setState({currentValue: data.data[i].sensor.currentValue});
                }
            }
            this.setDataToState(data.data);
            
        }).catch(error => {
            console.log(error);
        })
        setInterval(()=> axios.get('/sensordetail/list')
        .then(data => {
            console.log(data);
            for (var i=0;i<data.data.length;i++){
                if (data.data[i].sensor.deviceId === this.state.name){
                    this.setState({currentValue: data.data[i].sensor.currentValue});
                }
            }
            this.setDataToState(data.data);
            
        }).catch(error => {
            console.log(error);
        }),5000)
        
    }
    
    render(){
        const options = {
            animationEnabled: false,
            title:{
                text: "Moisture Chart"
            },
            axisX: {
                title: "Time",
                interval: 5000,
                valueFormatString: "HH:mm",
            },
            axisY:{
                title: "Value",
                includeZero: false
                
            },
            data: [
                {
                    type: "line",
                    dataPoints : this.state.data
                }
            ]
        }
    return (
        <div className="list-sensor-info">
            <h1>Cảm biến {this.props.name}</h1>
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
                            return (<SensorDetailRow key={data.x} time = {data.x} measure = {data.y} state={this.considerState}></SensorDetailRow>);
                        })
                    }
                </tbody>
            </table>
        </div>    
    )
    }
}

export default SensorDetail;