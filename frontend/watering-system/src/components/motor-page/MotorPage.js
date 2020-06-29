import React from 'react';
import MotorList from './MotorList';
import MotorDetail from './MotorDetail';
import './motorpage.scss';

function MotorPage() {
  return (
    <div className="container-fluid MotorPage">
      <h1>Thông tin và điều khiển máy bơm</h1>
      {/* <MotorList></MotorList> */}
      <MotorDetail name="hihi"></MotorDetail>
    </div>
  );
}

export default MotorPage;
