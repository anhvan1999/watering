import React from 'react';
import MotorList from './MotorList';
import './motorpage.scss';
import { Switch, Route, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import MotorDetail from './MotorDetail';

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
            <MotorDetail></MotorDetail>
          </Route>
      </Switch>
      </Router>
    );
  }
}

export default MotorPage;
