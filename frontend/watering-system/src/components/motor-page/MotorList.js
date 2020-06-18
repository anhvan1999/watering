import React, { useEffect } from 'react';
import MotorLabel from './MotorLabel';
import axios from '../../utils/axios-instance';
import './motorpage.scss';
import { connect } from 'react-redux';

function MotorList() {
  useEffect(() => {

  }, []);

  return (
    <div className='MotorList'>
      <div className="row thead-box">
        <p className='col-4'>Tên máy bơm</p>
        <p className='col-4'>Trạng thái</p>
        <p className='col-4'>Điều khiển</p>
      </div>
      {
        [1, 2, 3, 4, 5, 6].map(i => (
          <MotorLabel name={`${i}`} status="Off"></MotorLabel>
        ))
      }
      {
        [7, 8, 9, 10].map(i => (
          <MotorLabel name={`${i}`} status="On"></MotorLabel>
        ))
      }

    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return {};
}

export default connect(mapStateToProps, null)(MotorList);
