import React from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';

// Style
import style from './userinfo.module.scss';
import DeleteAccountButton from './DeleteAccountButton';

class UserHistoryPanel extends React.Component {
    editName(){
        let modal = document.getElementById("EditUserForm");
        let btn = document.getElementById("EditUserButton");
        let cancelBtn = document.getElementById("CancelButton");
        btn.onclick = function () {
            modal.style.display = "block";
        }
        cancelBtn.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    changePassword() {
        var modal = document.getElementById("ChangePasswordForm");
        var btn = document.getElementById("ChangePasswordButton");
        var cancelBtn = document.getElementById("CancelPasswordButton");
        btn.onclick = function () {
          modal.style.display = "block";
        }
        cancelBtn.onclick = function () {
          modal.style.display = "none";
        }
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      }
    render() {
        return (
            <div>
                <h4 className={getClassName(style.Mgbt, style.FontWeightTopic)}>
                    <svg className={getClassName("bi bi-info-circle", style.IconMargin)} width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                        <circle cx="8" cy="4.5" r="1" />
                    </svg>
                    ABOUT
                </h4>
                <div className="col-sm-12">
                    <div className={getClassName("row",style.AboutRowPosition)}>
                        <label className={getClassName(style.ControlLabel, "col-sm-3")}> User Name: </label>
                        <div className={getClassName("col-sm-6 text-center", style.Controls)}>User Name</div>
                        <div className="col-sm-3 text-center">
                            <button type="button" id="EditUserButton" className={getClassName("btn", "btn-primary")}
                                onClick={this.editName}>EDIT</button>
                        </div>
                    </div>
                    <div id="EditUserForm" className={getClassName(style.CustomForm)}>
                        <div className={getClassName(style.RemindFormContent)}>
                            <div className={getClassName(style.BodyForm)}>
                                <p className={getClassName(style.BodyFormSize)}>
                                    Your new Username :
                                                </p>
                                <input type="text" className="form-control" placeholder="New Username" aria-label="New Username"
                                    aria-describedby="basic-addon1" />
                            </div>
                            <div className="text-center">
                                <button type="button" id="SaveButton" className={getClassName("btn", "btn-primary", style.ButtonMargin)}>SAVE</button>
                                <button type="button" id="CancelButton" className={getClassName("btn", "btn-primary", style.ButtonMargin)}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                    <div className={getClassName("row",style.AboutRowPosition)}>
                        <label className={getClassName(style.ControlLabel, "col-sm-3")}>
                            Password:
                                        </label>
                        <div className={getClassName("col-sm-6 text-center", style.Controls)}>******</div>
                        <div className="col-sm-3 text-center">
                            <button type="button" id="ChangePasswordButton" className={getClassName("btn", "btn-primary")} onClick={this.changePassword}>CHANGE</button>
                        </div>
                        <div id="ChangePasswordForm" className={style.CustomForm}>
                            <div className={style.RemindFormContent}>
                                <div className={style.BodyForm}>
                                    <p className={style.BodyFormSize}>
                                        Your new Password :
                                                    </p>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="New password" />
                                </div>
                                <div className="text-center">
                                    <button type="button" id="SavePasswordButton" className={getClassName("btn", "btn-primary",style.ButtonMargin)}>SAVE</button>
                                    <button type="button" id="CancelPasswordButton" className={getClassName("btn", "btn-primary",style.ButtonMargin)}>CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default UserHistoryPanel