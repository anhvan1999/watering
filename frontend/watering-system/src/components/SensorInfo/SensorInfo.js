import React from 'react';
import style from './sensorInfo.scss';

import SensorInfoRow from './sensorInfo-row.js';
import SensorDetailRow from './sensor-detail-row.js';

import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
import { takeDataSensor } from '../../redux-store/actions/sensor-actions';


class SensorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            sensorID: 0
        }
        this.onClickturnTab = this.onClickturnTab.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    onClickturnTab = (id) => {
        this.setState({ show: false, sensorID: id });
    }

    considerState = (value) => {
        if (value >= 700) {
            return "Ẩm";
        }
        if (value >= 450 && value < 700) {
            return "Bình thường";
        }
        return "Khô";
    }

    updateInfo = () => {
        this.setState({ state: this.state });
        console.log('Update Info');
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/sensor/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        }).then(res => {
            let data = res.data;
            for (let item of data) {
                this.props.setList({
                    sensor: {
                        deviceId: 'Mois'
                    },
                    value: item.currentValue
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="sensor-info">
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
                                this.props.sensor.map(x => {
                                    if (x.devicedid != "") {
                                        return (<SensorInfoRow id={x.deviceId} measure={x.value} key={x.deviceId} state={this.considerState} func={this.onClickturnTab}></SensorInfoRow>)
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
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

function mapDispatchToProps(dispatch) {
    return {
        setList: (data) => { dispatch(takeDataSensor(data)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorInfo);
