import React from 'react';
import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
import style from './motordetail.module.scss';
import { Link } from 'react-router-dom';
import { getClassName } from '../../utils/component-utils';
class MotorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            currentState: false,
            maxCurrentState: 0,
            minCurrentState: 0,
            data: [],
            currentValue: 0,
        }
    }
    checkCurrentState = (value) => {
        if (value) {
            return <span class="badge badge-primary">Bật</span>;
        }
        else {
            return <span class="badge badge-danger">Tắt</span>;
        }
    }
    render() {
        return (
            <div className={getClassName(style.ListMotorInfo)}>
                <h1>Máy bơm
                 {/* {this.props.name} */}
                </h1>
                <Link id="turn-back" className="btn btn-outline-info" to={'/app/motor'}>Quay về</Link>
                <div className={style.MotorStatus}>
                    <p>
                        Trạng thái hiện tại : {this.checkCurrentState(this.currentState)}
                    </p>
                    <p>Số đo hiện tại: {this.state.currentValue}</p>
                    <p className="col-12">Giá trị ngưỡng cao nhất  : {this.state.maxCurrentState}</p>
                    <p className="col-12">Giá trị ngưỡng thất nhất : {this.state.minCurrentState}</p>

                    <form className={style.MotorSettingForm}>
                        <div className="form-group">
                            <label>Bật/Tắt máy bơm :</label>

                        </div>
                        <div className="form-group">
                            <label>Điều khiển ngưỡng tưới:</label>
                            <label>Giá trị thấp nhất:</label>
                            <input type="text" className="form-control" id="minStateValue" />
                            <label>Giá trị cao nhất:</label>
                            <input type="text" className="form-control" id="maxStateValue" />
                            <button className="btn btn-primary">Điều khiển</button>
                        </div>
                    </form>
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
export default MotorDetail