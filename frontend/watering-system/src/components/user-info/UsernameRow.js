import React from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';
import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';
// Style
import style from './userinfo.module.scss';

class UsernameRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FullnameValid: true,
            newFullname: ''
        };
        this.changeHandle = this.changeHandle.bind(this);
        this.saveUsername = this.saveUsername.bind(this);
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
        const fullname = event.target.value;
        this.setState({
            FullnameValid: fullname !== '',
            newFullname: fullname
        });

    };

    saveUsername() {
        if (this.state.FullnameValid) {
            axios.put('/user/info/about/changeFullName',{newFullName:this.state.newFullname},{
                headers: {
                  'Authorization': `jwt ${this.props.token}`
                }
              }).then(res=>{ 
                let modal = document.getElementById("EditUserForm");
                this.props.changeFullName(this.state.newFullname);
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
                    <label className={getClassName(style.ControlLabel, "col-sm-3")}> Full Name: </label>
                    <div className={getClassName("col-sm-6 text-center", style.Controls)}>{this.props.userName}</div>
                    <div className="col-sm-3 text-center">
                        <button type="button" id="EditUserButton" className={getClassName("btn", "btn-primary")}
                            onClick={this.DisplayForm.bind(this, "EditUserForm")}>EDIT</button>
                    </div>

                </div>
                <div id="EditUserForm" className={getClassName(style.CustomForm)}>
                    <div className={getClassName(style.RemindFormContent)}>
                        <div className={getClassName(style.BodyForm)}>
                            <label >Your new Fullname : </label>
                            <input type="text" className="form-control" placeholder="New Username"
                                onChange={this.changeHandle}
                            ></input>
                            <div className={getClassName("col-12 invalid-feedback", (this.state.FullnameValid ? '' : 'd-flex'))}>
                                Your new fullname is unvalid
                                </div>
                        </div>
                        <div className="text-center">
                            <button type="button" onClick={this.saveUsername} className={getClassName("btn", "btn-primary", style.ButtonMargin)}>SAVE</button>
                            <button type="button" onClick={this.cancelButtonEvent.bind(this, "EditUserForm")} className={getClassName("btn", "btn-primary", style.ButtonMargin)}>CANCEL</button>
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
export default connect(mapStateToProps,null)(UsernameRow)