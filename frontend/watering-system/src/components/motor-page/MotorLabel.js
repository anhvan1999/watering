import React from 'react';

import { getClassName } from '../../utils/component-utils';

import style from './motorpage.module.scss';

function MotorLabel(props) {
  let status = (props.status) ?
    <span class="badge badge-success">Bật</span>
    : <span class="badge badge-secondary">Tắt</span>;


  return (
    <div className={getClassName("row", style.MotorLabel)}>
      <div className="col">
        <h4 class="font-weight-bold">#{props.name} {status}</h4>
        <div class="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">5</button>
          <button type="button" class="btn btn-secondary">6</button>
          <button type="button" class="btn btn-secondary">7</button>
        </div>
      </div>
    </div>
  )
}

export default MotorLabel;