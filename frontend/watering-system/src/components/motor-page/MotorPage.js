import React from 'react';
import MotorList from './MotorList';
import MotorDetail from './MotorDetail';
import './motorpage.scss';
import { Switch, Route} from 'react-router-dom';

class MotorPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        motorName:''
    }
    this.setIdDetail = this.setIdDetail.bind(this);
  }
  setIdDetail = (name) =>{
    this.setState({motorName:name})
  }


  render(){
    return (
            <div className="container-fluid MotorPage">
              <h1>Thông tin và điều khiển máy bơm</h1>
              <MotorList clicktoDetail={this.setIdDetail}></MotorList>
            </div>
          
    );
  }
}

export default MotorPage;
