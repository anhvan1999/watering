import React from 'react';

import MotorLabel from './MotorLabel';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.scss';

function MotorList() {
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

export default MotorList;
