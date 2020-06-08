import React from 'react';

import MotorLabel from './MotorLabel';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.module.scss';

function MotorList() {
  return (
    <div className={getClassName("col-md-3 pt-3 h-100 border-bottom", style.MotorList)}>
      <div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Mã số máy bơm" aria-label="Mã số máy bơm" />
          <div class="input-group-append">
            <button class="btn btn-outline-success" type="button">Lọc</button>
          </div>
        </div>
      </div>
      <div>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <MotorLabel name={`${i}`}></MotorLabel>
          ))
        }
      </div>
    </div>
  );
}

export default MotorList;
