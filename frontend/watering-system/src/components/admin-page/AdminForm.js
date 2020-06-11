import React, { useState } from 'react';
import { FaUserCircle, FaKey, FaUserLock, FaUserMinus} from 'react-icons/fa';
import { getClassName } from '../../utils/component-utils';
import { useRouteMatch, useHistory } from 'react-router-dom';

import style from './admin.module.scss';

export default function AdminForm(props) {
  // State of component
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [repeatpassword, setRepeatpassword] = useState('');
  let [usernameValid, setUsernameValid] = useState(true);
  let [passwordValid, setPasswordValid] = useState(true);
  let [repeatpasswordvalid, setRepeatpasswordValid] = useState(true);
  let [allValid, setAllValid] = useState(true);
  let { path } = useRouteMatch();
  let history = useHistory();

  // Handle login button click
  let AddUserBtnHandle = () => {
    let valid = true;

    if (username === '') {
      valid = false;
      setUsernameValid(false);
    }

    if (password === '') {
      valid = false;
      setPasswordValid(false);
    }
    if (repeatpassword===''){
        valid=false;
        setRepeatpasswordValid(false);
    }

    if (!valid) {
      setAllValid(false);
      return;
    }

    //add a authenticate function
  };
 
  let changeHandle = (setValue, setValid) => {
    return (event) => {
      setValue(event.target.value);
      setValid(event.target.value !== '');
    };
  };

  return (
    <div className={getClassName("card", style.AdminCard)}>
      <div className="card-header">
      <h3 className="text-center text-primary"> Chào mừng trở lại, admin! </h3>
        <h3 className="text-center text-primary"><FaUserLock></FaUserLock> Thêm người dùng </h3>
      </div>
      <div className="card-body">
        <div>
          <div className="form-group row">
            <label htmlFor="username" className="col-12 col-form-label text-secondary"><FaUserCircle></FaUserCircle> Tài khoản</label>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={changeHandle(setUsername, setUsernameValid)} />
            </div>
            <div className={getClassName("col-12 invalid-feedback", (usernameValid ? '' : 'd-flex'))}>
              Username không hợp lệ
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-12 col-form-label text-secondary"><FaKey></FaKey> Mật khẩu</label>
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={changeHandle(setPassword, setPasswordValid)} />
            </div>
            <div className={getClassName("col-12 invalid-feedback", (passwordValid ? '' : 'd-flex'))}>
              Password không hợp lệ
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="repeatpassword" className="col-12 col-form-label text-secondary"><FaKey></FaKey> Nhập lại mật khẩu</label>
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                id="repeatpassword"
                onChange={changeHandle(setRepeatpassword, setRepeatpasswordValid)} />
            </div>
            <div className={getClassName("col-12 invalid-feedback", (repeatpasswordvalid ? '' : 'd-flex'))}>
              Password nhập lại không hợp lệ
            </div>
          </div>
    
          <div className="form-group row">
            <div className="col-md-12 text-center">
              <button className="btn btn-success w-50 center" onClick={AddUserBtnHandle}>Thêm người dùng</button>
              <div class="col mt-3"></div>
            </div>

            <div className={getClassName("col-12 invalid-feedback", (allValid ? '' : 'd-flex'))}>
                Thao tác không thành công, vui lòng nhập thông tin hợp lệ
            </div>
            
            </div>
          
        </div>
      </div>
    </div>
  );
};
