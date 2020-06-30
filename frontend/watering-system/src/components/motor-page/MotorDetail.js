import React from 'react';
// import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
import style from './motordetail.module.scss';
import { Link } from 'react-router-dom';
import { getClassName } from '../../utils/component-utils';
import { connect } from 'react-redux';
import { controlMotor } from '../../service/ws-service';
import MotorDetailRow from './MotorDetailRow';
import CanvasJSReact from '../SensorInfo/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MotorDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: this.props.motorName,
            currentStatus: <span></span>,
            uppercurrentStatus: 0,
            lowercurrentStatus: 0,
            data: [],
            currentValue: 0,
            inputwater: 0,
            deviceId: "",
            uppersubmit: 0,
            lowersubmit: 0,
            datachart: [
            ],
        }

    }

    checkStatus = (data) => {
        let value = data.currentValue;
        let lower = data.lowerSensorBound;
        let upper = data.upperSensorBound;
        if (value >= upper) {
            return <span className="badge badge-danger">Tắt</span>;
        }
        else {
            if (value < lower) {
                return <span className="badge badge-primary">Bật</span>;
            }
            else {
                return this.state.currentStatus;
            }
        }
    }
    checkhandcontrol() {
        if (document.getElementById("controlhand").value === 'On') {

           
                document.getElementById("controlhand").value = 'Off';
                document.getElementById("controlhand").innerHTML = 'Tắt';
                //Invisible element
                document.getElementById("forminputwater").style.visibility = 'visible';
        }
        else {

            document.getElementById("controlhand").value = 'On';
            document.getElementById("controlhand").innerHTML = 'Bật';
            document.getElementById("forminputwater").style.visibility = 'hidden';
        }
    }
    controlwater(e) {
        if (e.target.value === '') {
            alert("Vui lòng nhập giá trị");
        }
        else
            this.setState({ inputwater: e.target.value });
    }
    submitwater(e) {
        if (this.state.inputwater <= 0 || this.state.inputwater > 5000) {
            alert("Vui lòng nhập lại giá trị nước cần bơm hợp lệ!");
        }
        else if (this.state.currentValue > this.state.uppercurrentStatus || this.state.currentValue < this.state.lowercurrentStatus) {
            alert("Giá trị hiện tại vượt quá ngưỡng cho phép");
            document.getElementById("controlhand").value = 'On';
            document.getElementById("controlhand").innerHTML = 'Bật';
            document.getElementById("forminputwater").style.visibility = 'hidden';
        }
            else {
            controlMotor(this.state.deviceId, this.state.inputwater);
            let eventNameHistory = "Set value " + this.state.inputwater+" in " + this.state.deviceId;
            axios.post('/history/add', {eventName: eventNameHistory}, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
                }
            }).then(() => {
               
            }).catch(error => {
                console.log(error);
            });
            alert("Bạn đã bơm nước thành công");
        }
    }
    setlowersubmit(e) {
        if (e.target.value === '') {
            alert("Vui lòng nhập giá trị");
        }
        else this.setState({ lowersubmit: e.target.value });
    }
    setuppersubmit(e) {
        if (e.target.value === '') {
            alert("Vui lòng nhập giá trị");
        }
        else this.setState({ uppersubmit: e.target.value });
    }
    submitlower(e) {

        if (this.state.lowersubmit >= 0 && this.state.lowersubmit <= 5000 && this.state.lowersubmit < this.state.uppercurrentStatus) {
            let data = { function: "LOWER", value: this.state.lowersubmit, id: this.state.deviceId };
            axios.post('/motor/control', data, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
                }
            }).then(() => {
                this.setState({
                    lowercurrentStatus: this.state.lowersubmit
                });
            }).catch(error => {
                console.log(error);
            });
            let eventNameHistory = "Set Lower Bound " + this.state.lowersubmit+" in " + this.state.deviceId;
            axios.post('/history/add', {eventName: eventNameHistory}, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
                }
            }).then(() => {
               
            }).catch(error => {
                console.log(error);
            });
            alert("Bạn đã gửi cho server thành công!");
        }
        else {
            alert("Ngưỡng có giá trị từ 0 đến 5000 và ngưỡng thấp nhất phải thấp hơn ngưỡng cao nhất!");
        }
    }

    submitupper(e) {
        if (this.state.uppersubmit >= 0 && this.state.uppersubmit <= 5000 && this.state.uppersubmit > this.state.lowercurrentStatus) {
            let data = { function: "UPPER", value: this.state.uppersubmit, id: this.state.deviceId };
            axios.post('/motor/control', data, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
                }
            }).then(() => {
                this.setState({
                    uppercurrentStatus: this.state.uppersubmit
                });
            }).catch(error => {
                console.log(error);
            });
            let eventNameHistory = "Set Upper Bound " + this.state.uppersubmit+" in " + this.state.deviceId;
            axios.post('/history/add', {eventName: eventNameHistory}, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
                }
            }).then(() => {
               
            }).catch(error => {
                console.log(error);
            });
            alert("Bạn đã gửi cho server thành công!");
        }
        else {
            alert("Ngưỡng có giá trị từ 0 đến 5000 và ngưỡng cao nhất phải cao hơn ngưỡng thấp nhất !");
        }
    }

    setData = (data) => {
        //console.log("aaa",data);
        let last_index = data.data.length - 1;
        if (data.data[last_index].motor.deviceId === this.state.name) {
            var _data = this.state.datachart.concat({
                x: new Date(data.data[last_index].publishTime),
                y: data.data[last_index].motor.currentValue
            });
            this.setState({
                deviceId: data.data[last_index].motor.deviceId,
                currentValue: data.data[last_index].motor.currentValue,
                uppercurrentStatus: data.data[last_index].motor.upperSensorBound,
                lowercurrentStatus: data.data[last_index].motor.lowerSensorBound,
                currentStatus: this.checkStatus(data.data[last_index].motor),
                datachart: _data
            });
        }
    }
    setDataToState = (data) => {
        let _data = data
            .filter(detail => detail.motor.deviceId === this.state.name)
            .map(detail => {
                return {
                    time: new Date(detail.publishTime),
                    value: detail.motor.currentValue,
                    lower: detail.motor.lowerSensorBound,
                    upper: detail.motor.upperSensorBound
                }
            });
        this.setState({
            data: _data
        });
    }
    componentDidMount() {
        axios.get('/motordetail/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        })
            .then(data => {
                this.setData(data);
                this.setDataToState(data.data);
            }).catch(error => {
                console.log(error);
            });
        setInterval(() => axios.get('/motordetail/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        })
            .then(data => {
                this.setData(data);
                this.setDataToState(data.data);
            }).catch(error => {
                console.log(error);
            }), 5000)

    }
    render() {
        const options = {
            animationEnabled: false,
            title:{
                text: "Biểu đồ lượng nước máy bơm"
            },
            axisX: {
                title: "Thời gian",
                interval: 2000,
                valueFormatString: "HH:mm",
            },
            axisY:{
                title: "Lượng nước",
                includeZero: true
                
            },
            data: [
                {
                    type: "line",
                    dataPoints : this.state.datachart
                }
            ]
        }
        return (
            <div className={getClassName(style.MotorInfo)}>
                <div className={getClassName(style.ListMotorInfo)}>
                    <h1>Máy bơm {this.props.name}
                    </h1>
                    <Link id="turn-back" className='btn btn-outline-info btn-motordetail' to={'/app/motor'}>Quay về</Link>
                    <div className={style.MotorStatus}>
                        <p>
                            Trạng thái hiện tại : {this.state.currentStatus}
                        </p>
                        <p>Số đo hiện tại: {this.state.currentValue}</p>
                        <p className="col-12">Giá trị ngưỡng thấp nhất : {this.state.lowercurrentStatus}</p>
                        <p className="col-12">Giá trị ngưỡng cao nhất  : {this.state.uppercurrentStatus}</p>


                        <div >
                            <div className="col-12">Nhập giá trị ngưỡng thấp nhất </div>

                            <div className="col-12">
                                <input
                                    required
                                    type="number"
                                    className={getClassName("form-control",style.MotorForm)}
                                    onChange={this.setlowersubmit.bind(this)} />

                            </div>
                            <button className="btn btn-outline-info"

                                onClick={this.submitlower.bind(this)}> Gửi </button>
                        </div>
                        <br></br>
                        <div>
                            <div className="col-12">Nhập giá trị ngưỡng cao nhất </div>
                            <div className="col-12">
                                <input
                                    required
                                    type="number"
                                    className={getClassName("form-control",style.MotorForm)}
                                    onChange={this.setuppersubmit.bind(this)} />

                            </div>
                            <button className="btn btn-outline-info"

                                onClick={this.submitupper.bind(this)}> Gửi </button>
                        </div>

                        <br></br>
                        <p className="col-12" >Bật/tắt chế độ điều khiển bằng tay: <button id="controlhand" className="btn btn-primary btn-sensor" value="On"
                            onClick={this.checkhandcontrol.bind(this)}> Bật</button></p>

                        <div id="forminputwater" className={getClassName("form-group row",style.MotorControlHand)}>
                            <div className="col-12">Nhập lượng nước cần bơm</div>

                            <div className="col-12">
                                <input
                                    required
                                    type="number"
                                    className={getClassName("form-control",style.MotorForm)}
                                    id="inputwater"
                                    onChange={this.controlwater.bind(this)} />

                            <button id="submitwater" className="btn btn-outline-info" onClick={this.submitwater.bind(this)}> Kích hoạt </button>
                            </div>
                                
                        </div>

                    </div>


                   <CanvasJSChart options = {options}></CanvasJSChart>
                    <table className="table table-hover table-detail">
                        <thead className="thead-light">
                            <tr>
                                <th>Thời gian</th>
                                <th>Giá trị</th>
                                <th>Ngưỡng dưới</th>
                                <th>Ngưỡng trên</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.reverse().map(data => {
                                    return (<MotorDetailRow time={data.time} value={data.value} upper={data.upper} lower={data.lower}></MotorDetailRow>);
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
        token: state.user.jwtToken
    };
    return result;
}
export default connect(mapStateToProps, null)(MotorDetail)