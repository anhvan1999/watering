import React from 'react';
import { Link } from 'react-router-dom';
// Utils
import { getClassName } from '../../utils/component-utils';
import { logout } from '../../service/auth-service';
import { connect } from 'react-redux';
// Style
import style from './userinfo.module.scss';
import axios from '../../utils/axios-instance';

class DeleteAccountButton extends React.Component {
  alertDelete() {
    let modal = document.getElementById("DeleteForm");
    modal.style.display = "block";
  }

  cancelButtonEvent() {
    let modal = document.getElementById("DeleteForm");
    modal.style.display = "none";
  }

  deleteButtonEvent=()=>{
   
    axios.put('/user/info/delete',{},{
      headers: {
        'Authorization': `jwt ${this.props.token}`
      }
    }).then(res=>{ 
      console.log(res);
      let modal = document.getElementById("DeleteForm");
      modal.style.display = "none";
      logout();
      return <Link to="/app"></Link>;
    }
    ).catch(error=>{
      console.log(error);
    });
  }

  render() {
    return (
      <div className="col text-center">
        <button type="button" id="DeleteBtn" className="btn btn-danger" onClick={this.alertDelete}>XÓA TÀI KHOẢN</button>
        <div id="DeleteForm" className={style.CustomForm}>
          <div className={style.RemindFormContent}>
            <div className={style.FormAlertHeader}>
              <h3> CẢNH BÁO</h3>
            </div>
            <div className={style.BodyForm}>
              <p>Bạn muốn xóa tài khoản ?</p>
            </div>
            <button type="button" onClick={this.deleteButtonEvent} className={getClassName("btn btn-danger", style.ButtonMargin)}>Đồng ý</button>
            <button type="button" onClick={this.cancelButtonEvent} className={getClassName("btn btn-danger", style.ButtonMargin)}>Không đồng ý</button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  let result = {
      token: state.user.jwtToken
  };
  return result;
}
export default connect(mapStateToProps,null)(DeleteAccountButton);