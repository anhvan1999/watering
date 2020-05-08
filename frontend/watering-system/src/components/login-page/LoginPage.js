import React from 'react';
import LoginForm from './LoginForm';

// Style
import style from './login.module.scss';

// Utils
import {getClassName} from '../../utils/component-utils';

function LoginPage(props) {
  return (
    <div className={getClassName("container-fluid", style.LoginPage)}>
      <div className="row my-auto">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <LoginForm></LoginForm>
        </div>
        <div className="col-md-3">
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
