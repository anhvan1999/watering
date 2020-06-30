import React from 'react';
import './motorpage.scss';
import { Link } from 'react-router-dom';


class MotorLabel extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.value}</td>
        <td><Link className='btn btn-primary' to={`/app/motor/${this.props.name}`} 
        onClick={()=>this.props.clicktoDetail(this.props.name)}
        >Chi tiết</Link></td>
      </tr>
    );
  }
}

export default MotorLabel;