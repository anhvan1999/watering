import React from 'react';
// import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
import style from './motordetail.module.scss';
import { Link } from 'react-router-dom';
import { getClassName } from '../../utils/component-utils';
import { connect } from 'react-redux';
import {controlMotor} from '../../service/ws-service'
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
            inputwater:0,
            deviceId:"",
            uppersubmit:0,
            lowersubmit:0
        }
        this.checkStatus = this.checkStatus.bind(this);
      
    }
   
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
    checkhandcontrol(){
        if (document.getElementById("controlhand").value==='On'){

        if (this.state.currentValue <= this.state.uppercurrentStatus && this.state.currentValue>= this.state.lowercurrentStatus){
            document.getElementById("controlhand").value='Off';
            document.getElementById("controlhand").innerHTML='Tắt';
            //Invisible element
            document.getElementById("forminputwater").style.visibility = 'visible';
        }
            else {
                alert("Giá trị hiện tại vượt quá ngưỡng cho phép");
            }
        }
        else {
       
            document.getElementById("controlhand").value='On';
            document.getElementById("controlhand").innerHTML='Bật';
            document.getElementById("forminputwater").style.visibility = 'hidden';   
        }
    }
    controlwater(e){
        if (e.target.value===''){
            alert("Vui lòng nhập giá trị");
        }
        else
        this.setState({inputwater:e.target.value});
    }
    submitwater(e){
        if (this.state.inputwater <=0 || this.state.inputwater > 5000){
            alert("Vui lòng nhập lại giá trị nước cần bơm hợp lệ!");
        }
        else {
            controlMotor(this.state.deviceId,this.state.inputwater);
            alert("Bạn đã bơm nước thành công");
        }
    }
    setlowersubmit(e){
        if (e.target.value===''){
            alert("Vui lòng nhập giá trị");
        }
        else this.setState({lowersubmit:e.target.value});
    }
    setuppersubmit(e){
        if (e.target.value===''){
            alert("Vui lòng nhập giá trị");
        }
        else this.setState({uppersubmit:e.target.value});
    }
    submitlower(e){
       
        if (this.state.lowersubmit >=0 && this.state.lowersubmit<=5000 && this.state.lowersubmit < this.state.uppercurrentStatus){
        let data ={function:"LOWER",value:this.state.lowersubmit,id:this.state.deviceId};
          axios.post('/motor/control', data, {
            headers: {
                'Authorization': `jwt ${this.props.token}`,
        }
        }).then( () => {
            this.setState({
                lowercurrentStatus: this.state.lowersubmit                  
            });   
        }).catch(error => {
            console.log(error);
        });
        }
        else {
            alert("Ngưỡng có giá trị từ 0 đến 5000 và ngưỡng thấp nhất phải thấp hơn ngưỡng cao nhất!");
        }
    }

    submitupper(e){
        if (this.state.uppersubmit >=0 && this.state.uppersubmit<=5000 && this.state.uppersubmit > this.state.lowercurrentStatus){
            let data ={function:"UPPER",value:this.state.uppersubmit,id:this.state.deviceId};
              axios.post('/motor/control', data, {
                headers: {
                    'Authorization': `jwt ${this.props.token}`,
            }
            }).then( () => {
                this.setState({
                    uppercurrentStatus: this.state.uppersubmit                  
                });       
            }).catch(error => {
                console.log(error);
            });
            }
            else {
                alert("Ngưỡng có giá trị từ 0 đến 5000 và ngưỡng cao nhất phải cao hơn ngưỡng thấp nhất !");
            }
    }

  
    setData = (data) => {
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].deviceId === this.state.name) {
                this.setState({
                    deviceId: data.data[i].deviceId,
                    currentValue: data.data[i].currentValue,
                    uppercurrentStatus: data.data[i].upperSensorBound,
                    lowercurrentStatus: data.data[i].lowerSensorBound,
                    currentStatus: this.checkStatus(data.data[i])
                });       
            }
        }
        if (this.state.currentValue > this.state.uppercurrentStatus || this.state.currentValue < this.state.lowercurrentStatus){
            document.getElementById("controlhand").value='On';
            document.getElementById("controlhand").innerHTML='Bật';
            document.getElementById("forminputwater").style.visibility = 'hidden';
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
                    <p className="col-12">Giá trị ngưỡng thấp nhất : {this.state.lowercurrentStatus}</p>
                    <p className="col-12">Giá trị ngưỡng cao nhất  : {this.state.uppercurrentStatus}</p>
                    
                      
                 <div >
            <div className="col-12">Nhập giá trị ngưỡng thấp nhất </div>
            
            <div className="col-12">
              <input
                required
                type="number"
                className="form-control"
                className={getClassName(style.MotorForm)}
                onChange={this.setlowersubmit.bind(this)}/>
               
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
                
                className="form-control"
                className={getClassName(style.MotorForm)}
                onChange={this.setuppersubmit.bind(this)}/>
                
            </div>
            <button className="btn btn-outline-info"
                
                     onClick={this.submitupper.bind(this)}> Gửi </button>
          </div>

<br></br>
                    <p className="col-12" >Bật/tắt chế độ điều khiển bằng tay: <button id ="controlhand" className="btn btn-primary btn-sensor" value="On"
                     onClick={this.checkhandcontrol.bind(this)}> Bật</button></p>
                 
                 <div className="form-group row" id="forminputwater" className={getClassName(style.MotorControlHand)}>
            <div className="col-12">Nhập lượng nước cần bơm</div>
            
            <div className="col-12">
              <input
                required
                type="number"
                className="form-control"
                className={getClassName(style.MotorForm)}
                id="inputwater"
                onChange={this.controlwater.bind(this)}/>
            </div>
           
            <button id ="submitwater" className="btn btn-outline-info"
                   
                     onClick={this.submitwater.bind(this)}> Kích hoạt </button>
          </div>

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