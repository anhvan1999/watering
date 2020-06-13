import React from 'react';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.scss';

class MotorLabel extends React.Component{
  
  
  constructor(props){
    super(props);
    this.state ={
    showTurnOn: false
    }
    this.showsTurnOn = this.showTurnOn.bind(this)
  }


  showTurnOn = () =>{
    this.setState({showTurnOn: !this.state.showTurnOn});
    console.log('turnOn');
  }

  render(){
    const status = this.props.status;
    const name = this.props.name;
    return(
      <div className ="row MotorLabel">
        <p className='col-4'>Máy bơm {name}</p>
        <p className='col-4'>{status}</p>
        <div className ='col-4'>
          {(status =='On') ?
          <button className='btn btn-danger'>Tắt</button>:
          <button className='btn btn-primary' onClick={this.showTurnOn}>Bật</button>}
        </div>
      {
        this.state.showTurnOn ? 
        <form className="col-12 turnOnMotor bg-light">
          <input className='motorInput' type="text" placeholder="Nhập khối lượng nước cần bơm"></input>
          <input type="submit" value ="Bơm" onClick={this.showTurnOn} className="btn btn-outline-primary"></input>
        </form>:
        <div></div>
      }
      </div>
    );  
  }
}

export default MotorLabel;