import React from 'react';

export default function LoginForm(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Đăng nhập</h3>
      </div>
      <div className="card-body">
        <form>
          <div className="form-group row">
            <label htmlFor="username" className="col-lg-4 col-form-label">Tài khoản</label>
            <div className="col-lg-8">
              <input type="text" className="form-control" id="username" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-lg-4 col-form-label">Mật khẩu</label>
            <div className="col-lg-8">
              <input type="password" className="form-control" id="password" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="" className="col-lg-4 col-form-label"></label>
            <div className="col-lg-8">
              <button className="btn btn-primary">Đăng Nhập</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
