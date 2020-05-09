import React, { useState } from 'react';
import { FaUserCircle, FaKey, FaRegAddressBook } from 'react-icons/fa';
import { usernamePasswordLogin } from '../../service/auth-service';
import { getClassName } from '../../utils/component-utils';

import style from './login.module.scss';

export default function LoginForm(props) {
  // State of component
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [usernameValid, setUsernameValid] = useState(true);
  let [passwordValid, setPasswordValid] = useState(true);
  let [allValid, setAllValid] = useState(true);

  // Handle login button click
  let loginBtnHandle = () => {
    let valid = true;

    if (username === '') {
      valid = false;
      setUsernameValid(false);
    }

    if (password === '') {
      valid = false;
      setPasswordValid(false);
    }

    if (!valid) {
      setAllValid(false);
      return;
    }

    usernamePasswordLogin(username, password, () => {

    }, (err) => {
      setAllValid(false);
    })
  };

  let changeHandle = (setValue, setValid) => {
    return (event) => {
      setValue(event.target.value);
      setValid(event.target.value !== '');
    };
  };

  // usernamePasswordLogin('superuser', 'watering');
  return (
    <div className={getClassName("card", style.LoginCard)}>
      <div className="card-header">
        <h3 className="text-center text-primary"><FaRegAddressBook></FaRegAddressBook> Đăng nhập</h3>
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
            <label htmlFor="password" className="col-12 col-form-label text-secondary"><FaKey></FaKey> <a href="#">Quên mật khẩu?</a></label>
            <div className="d-flex justify-content-between col-12">
              <button className="btn btn-primary w-100" onClick={loginBtnHandle}>Đăng Nhập</button>
            </div>
            <div className={getClassName("col-12 invalid-feedback", (allValid ? '' : 'd-flex'))}>
              Đăng nhập không thành công, vui lòng nhập thông tin hợp lệ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
