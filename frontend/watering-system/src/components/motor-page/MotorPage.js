import React from 'react';

import MotorList from './MotorList';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.module.scss';

function MotorPage() {
  return (
    <div className={getClassName("padding-top-62", "container-fluid", style.MotorPage)}>
      <div className="row h-100">
        <MotorList></MotorList>
      </div>
    </div>
  );
}

export default MotorPage;
