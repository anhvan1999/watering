import React from 'react';
import style from './sensorInfo.scss';

import SensorInfoRow from './sensorInfo-row.js';
import SensorDetailRow from './sensor-detail-row.js';

import {connect} from 'react-redux';
import axios from '../../utils/axios-instance';


class SensorInfo extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: true,
            sensorID:0
        }
        this.onClickturnTab = this.onClickturnTab.bind(this);
    }

    onClickturnTab = (id) =>{
        this.setState({show:false, sensorID:id});
        console.log('2');
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/sensor/list', {
            headers: {
                Authorization: `jwt ${this.props.token}`
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="sensor-info">
                {
                    this.state.show? 
                    <div className="list-sensor-info">
                        <h1>Thông tin cảm biến</h1>
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th>Cảm biến</th>
                                    <th>Số đo</th>
                                    <th>Trạng thái</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SensorInfoRow id={1} measure={80} state={"Ẩm"} func= {this.onClickturnTab}></SensorInfoRow>
                                <SensorInfoRow id={2} measure={85} state={"Ẩm"} func= {this.onClickturnTab}></SensorInfoRow>
                                <SensorInfoRow id={3} measure={70} state={"Khô"} func= {this.onClickturnTab}></SensorInfoRow>
                                <SensorInfoRow id={4} measure={65} state={"Khô"} func= {this.onClickturnTab}></SensorInfoRow>
                                <SensorInfoRow id={5} measure={75} state={"Ẩm"} func= {this.onClickturnTab}></SensorInfoRow>
                                <SensorInfoRow id={6} measure={70} state={"Khô"} func= {this.onClickturnTab}></SensorInfoRow>
                            </tbody>
                        </table>
                    </div> :
                    <div className="list-sensor-info">
                        <h1>Cảm biến {this.state.sensorID}</h1>
                        <button id= "turn-back" className ="btn btn-primary" onClick ={() => {this.setState({show:true});console.log('1')}}>Quay về</button>
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Số đo</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SensorDetailRow time={"Jun 1 2020 10:00AM"} measure={86} state={"Ẩm"}></SensorDetailRow>
                                <SensorDetailRow time={"Jun 1 2020 10:05AM"} measure={84} state={"Ẩm"}></SensorDetailRow>
                                <SensorDetailRow time={"Jun 1 2020 10:10AM"} measure={83} state={"Ẩm"}></SensorDetailRow>
                                <SensorDetailRow time={"Jun 1 2020 10:15AM"} measure={80} state={"Ẩm"}></SensorDetailRow>
                            </tbody>
                        </table>
                    </div>
                    
                }                
            </div>
        );
    }
}

function mapStateToProps(state) {
    let result = {
        token: state.user.jwtToken
    };
    return result;
}

export default connect(mapStateToProps, null)(SensorInfo);
