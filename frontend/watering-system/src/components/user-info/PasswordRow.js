import React from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';
import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
// Style
import style from './userinfo.module.scss';

class PasswordRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            passwordValid: true,
            newPassword: ''
        };
        this.changeHandle = this.changeHandle.bind(this);
        this.savePassword = this.savePassword.bind(this);
    }

    DisplayForm(name) {
        let modal = document.getElementById(name);
        modal.style.display = "block";
    }
    cancelButtonEvent(name) {
        let modal = document.getElementById(name);
        modal.style.display = "none";
    }

    changeHandle(event) {
        const password = event.target.value;
        this.setState({
            passwordValid: password !== '',
            newPassword: password
        });

    };

    savePassword() {
        if (this.state.passwordValid) {
            axios.put('/user/info/about/changePassword',{newPassword:this.state.newPassword},{
                headers: {
                  'Authorization': `jwt ${this.props.token}`
                }
              }).then(res=>{ 
                let modal = document.getElementById("ChangePasswordForm");
                modal.style.display = "none";
              }
              ).catch(error=>{
                console.log(error);
              });
          
        }
    }

    render() {
        return (
            <div>
                <div className={getClassName("row", style.AboutRowPosition)}>
                    <label className={getClassName(style.ControlLabel, "col-sm-3")}>
                        Password:
                    </label>
                    <div className={getClassName("col-sm-6 text-center", style.Controls)}>******</div>
                    <div className="col-sm-3 text-center">
                        <button type="button" id="ChangePasswordButton" className={getClassName("btn", "btn-primary")}
                            onClick={this.DisplayForm.bind(this, "ChangePasswordForm")}>CHANGE</button>
                    </div>
                </div>
                <div id="ChangePasswordForm" className={style.CustomForm}>
                    <div className={style.RemindFormContent}>
                        <div className={style.BodyForm}>
                            <p className={style.BodyFormSize}>
                                Your new Password :
                                </p>
                            <input type="password" className="form-control" placeholder="New password" 
                             onChange={this.changeHandle}
                             />
                            <div className={getClassName("col-12 invalid-feedback", (this.state.passwordValid ? '' : 'd-flex'))}>
                                Your new password is unvalid
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="button" onClick={this.savePassword} className={getClassName("btn", "btn-primary", style.ButtonMargin)}>SAVE</button>
                            <button type="button" onClick={this.cancelButtonEvent.bind(this, "ChangePasswordForm")} className={getClassName("btn", "btn-primary", style.ButtonMargin)}>CANCEL</button>
                        </div>
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
export default connect(mapStateToProps,null)( PasswordRow)