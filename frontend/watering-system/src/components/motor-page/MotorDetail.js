import React from 'react';
// import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
import style from './motordetail.module.scss';
import { Link } from 'react-router-dom';
import { getClassName } from '../../utils/component-utils';
import { connect } from 'react-redux';
class MotorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            currentStatus: <span></span>,
            uppercurrentStatus: 0,
            lowercurrentStatus: 0,
            data: [],
            currentValue: 0,
        }
        this.checkStatus = this.checkStatus.bind(this);
    }
    // checkCurrentState = (value) => {
    //     if (value) {
    //         return <span className="badge badge-primary">Bật</span>;
    //     }
    //     else {
    //         return <span className="badge badge-danger">Tắt</span>;
    //     }
    // }
    checkStatus(data) {
        let value = data.currentValue;
        let lower = data.lowerSensorBound;
        let upper = data.upperSensorBound;
        if (value > upper) {
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
    setData = (data) => {
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].deviceId === this.state.name) {
                this.setState({
                    currentValue: data.data[i].currentValue,
                    uppercurrentStatus: data.data[i].upperSensorBound,
                    lowercurrentStatus: data.data[i].lowerSensorBound,
                    currentStatus: this.checkStatus(data.data[i])
                });
            }
        }
        

    }
    componentDidMount() {
        axios.get('/motor/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        })
            .then(data => {
                this.setData(data);
            }).catch(error => {
                console.log(error);
            });
        setInterval(() => axios.get('/motor/list', {
            headers: {
                'Authorization': `jwt ${this.props.token}`
            }
        })
            .then(data => {
                this.setData(data);
            }).catch(error => {
                console.log(error);
            }), 10000)

    }
    render() {
        return (
            <div className={getClassName(style.ListMotorInfo)}>
                <h1>Máy bơm {this.props.name}
                </h1>
                <Link id="turn-back" className="btn btn-outline-info" to={'/app/motor'}>Quay về</Link>
                <div className={style.MotorStatus}>
                    <p>
                        Trạng thái hiện tại : {this.state.currentStatus}
                    </p>
                    <p>Số đo hiện tại: {this.state.currentValue}</p>
                    <p className="col-12">Giá trị ngưỡng thất nhất : {this.state.lowercurrentStatus}</p>
                    <p className="col-12">Giá trị ngưỡng cao nhất  : {this.state.uppercurrentStatus}</p>

                    {/* <form className={style.MotorSettingForm}>
                        <div className="form-group">
                            <label>Bật/Tắt dieu khien bang tay :</label>

                        </div>
                        neu nhu ma bat =>
                        nhap gia tri can bom 
                        set lower = 0
                        upper = 10000
                        neu nhu tat =>
                        set lower = 500
                        set upper = 700
                        
                        <div className="form-group">
                            <label>Điều khiển ngưỡng tưới:</label>
                            <label>Giá trị thấp nhất:</label>
                            <input type="text" className="form-control" id="minStateValue" />
                            <label>Giá trị cao nhất:</label>
                            <input type="text" className="form-control" id="maxStateValue" />
                            <button className="btn btn-primary">Điều khiển</button>
                        </div>
                    </form> */}
                </div>


                {/* <CanvasJSChart options = {options}></CanvasJSChart> */}
                {/* <table className="table table-hover table-detail">
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
            </table> */}
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