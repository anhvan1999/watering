import React from 'react';
import './motorpage.scss';
import { Link } from 'react-router-dom';


class MotorLabel extends React.Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.value}</td>
        <td><Link className='btn btn-primary' to={`/app/motor/${this.props.name}`} onlick={() =>this.props.clicktoDetail(this.props.name)}>Chi tiết</Link></td>
      </tr>
    );
  }
}

export default MotorLabel;