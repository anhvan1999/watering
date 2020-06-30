import React from 'react';
import MotorLabel from './MotorLabel';
import axios from '../../utils/axios-instance';
import { connect } from 'react-redux';

class MotorList extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    axios.get('/motor/list', {
        headers: {
            'Authorization': `jwt ${this.props.token}`
        }
    }).then(data => {
      console.log(data);
    }).catch(error => {
        console.log(error);
    });
}

  render(){
    return (
      <div className="MotorList">
      <table className='table table-hover motorList-table'>
        <thead className='thead-light'>
          <tr>
            <th>Máy bơm</th>
            <th>Giá trị</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {this.props.motor.map(x =>(
            <MotorLabel key={x.motorid} name={x.motorid} value={x.data.motor.currentValue} clicktoDetail={this.props.clicktoDetail}></MotorLabel>
          ))}
        </tbody>
      </table>
      </div>
    );
  }  
}

function mapStateToProps(state) {
  let result = {
      motor: state.motor,
      token: state.user.jwtToken
  };
  console.log(state);
  return result;
}

export default connect(mapStateToProps, null)(MotorList);
