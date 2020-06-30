import React from 'react';
import './sensorInfo.scss';
import SensorInfoRow from './sensorInfo-row.js';
import {connect} from 'react-redux';
import axios from '../../utils/axios-instance';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import SensorDetail from './sensor-detail';

class SensorInfo extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            sensorID:''
        }
        this.updateInfo = this.updateInfo.bind(this);
        this.setIdDetail = this.setIdDetail.bind(this);
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

    updateInfo =()=>{
        this.setState({state:this.state});
        console.log('Update Info');
    }
    setIdDetail = (id) =>{
        this.setState({sensorID:id})
    }
    

    componentDidMount() {
        console.log(this.props);
        axios.get('/sensor/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    

    render() {
        
        return ( 
            <Router>
            <div className="sensor-info">
                    <Switch>
                    <Route exact path='/app/sensor'>
                    
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
                                {
                                    this.props.sensor.map(x =>{
                                        if (x.devicedId !== ""){
                                            return (<SensorInfoRow key={x.deviceId} id={x.deviceId} measure={x.value} state={this.considerState} func={this.setIdDetail}></SensorInfoRow>);
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    </Route>
                    <Route path={`/app/sensor/${this.state.sensorID}`}>
                        <SensorDetail name={this.state.sensorID}></SensorDetail>
                    </Route>
                       
                    </Switch>         
            </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    let result = {
        sensor: state.sensor,
        token: state.user.jwtToken
    };
    console.log(state);
    return result;
}

export default connect(mapStateToProps, null)(SensorInfo);
