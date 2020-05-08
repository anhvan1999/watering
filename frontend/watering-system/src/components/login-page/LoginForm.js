import React from 'react';
import {FaUserCircle, FaKey, FaRegAddressBook} from 'react-icons/fa';

export default function LoginForm(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center text-primary"><FaRegAddressBook></FaRegAddressBook> Đăng nhập</h3>
      </div>
      <div className="card-body">
        <form>
          <div className="form-group row">
            <label htmlFor="username" className="col-12 col-form-label text-secondary"><FaUserCircle></FaUserCircle> Tài khoản</label>
            <div className="col-12">
              <input type="text" className="form-control" id="username" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-12 col-form-label text-secondary"><FaKey></FaKey> Mật khẩu</label>
            <div className="col-12">
              <input type="password" className="form-control" id="password" />
            </div>
          </div>
          <div className="form-group row">
            <div className="d-flex justify-content-between col">
            <button className="btn btn-primary">Đăng Nhập</button>
              <button className="btn btn-outline-danger">Quên Mật Khẩu</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
