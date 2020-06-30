import React from 'react';
import MotorList from './MotorList';
import MotorDetail from './MotorDetail';
import './motorpage.scss';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

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
      <Router>
        <Switch>
          <Route exact path='/app/motor'>
            <div className="container-fluid MotorPage">
              <h1>Thông tin và điều khiển máy bơm</h1>
              <MotorList clicktoDetail={this.setIdDetail}></MotorList>
            </div>
          </Route>
          <Route path={`/app/motor/${this.state.motorName}`}>
            <MotorDetail motorName={this.state.motorName}></MotorDetail>
          </Route>
      </Switch>
      </Router>
    );
  }
}

export default MotorPage;
