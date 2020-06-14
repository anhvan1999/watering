import React from 'react';

import MotorList from './MotorList';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.scss';

function MotorPage() {
  return (
    <div className="container-fluid MotorPage">
      <h1>Thông tin và điều khiển máy bơm</h1>
      <MotorList></MotorList>
    </div>
  );
}

export default MotorPage;
