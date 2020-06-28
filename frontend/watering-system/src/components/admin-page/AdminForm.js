import React from 'react';
import { FaUserCircle, FaKey, FaUserLock} from 'react-icons/fa';
import { getClassName } from '../../utils/component-utils';

import style from './admin.module.scss';
import { connect } from 'react-redux';
import axios from '../../utils/axios-instance';

class AdminForm extends React.Component {
  // State of component



  constructor(props){
    super(props);
    this.handleValidation = this.handleValidation.bind(this);
    this.state = {
        fields:{},
        errors:{}
    }
  }

  

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["username"]){
       formIsValid = false;
       errors["username"] = "Username không hợp lệ ";
    }

    if(!fields["fullname"]){
      formIsValid = false;
      errors["fullname"] = "Fullname không hợp lệ ";
   }

   if(!fields["password"]){
    formIsValid = false;
    errors["password"] = "Password không hợp lệ ";
 }

 if(!fields["repeatpassword"]){
  formIsValid = false;
  errors["repeatpassword"] = "Password nhập lại không hợp lệ";
}

if(fields["repeatpassword"]!==fields["password"]){
  formIsValid = false;
  errors["repeatpassword"] = "Password nhập lại không hợp lệ";
}

   this.setState({errors: errors});
   return formIsValid;
}
contactSubmit(e){
  e.preventDefault();
  if(this.handleValidation()){
    let data = (this.state.fields)
    axios.post('/admin/add', data, {
      headers: {
          'Authorization': `jwt ${this.props.token}`,
      }
  }).then(res => {
    console.log("res",res);
     if (res.data===true)
        {alert("Thêm user thành công!!");
        window.location.reload(false); 
        }
      else
        alert("Tên đăng nhập đã tồn tại!");
  }).catch(error => {
      console.log(error);
  });
    
  }else{
     alert("Thao tác không thành công, vui lòng nhập thông tin hợp lệ");
  }

 

}

handleChange(field, e){         
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}
 
  // Handle login button click
  render(){
  return (
    <div  className="overflow-auto" className={getClassName("card", style.AdminCard)}>
      <div className="card-header">
      <h3 className="text-center text-primary"> Chào mừng trở lại, admin! </h3>
        <h3 className="text-center text-primary"><FaUserLock></FaUserLock> Thêm người dùng </h3>
      </div>
      <div className="card-body">
        <div>
          
          <div className="form-group row">
            <label htmlFor="username" className="col-12 col-form-label text-secondary"><FaUserCircle></FaUserCircle> Tên đăng nhập </label>
            <div className="col-12">
              <input
                required
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]|| ''} />
            </div>
            <span style={{color: "red",paddingLeft:"10px"}}>{this.state.errors["username"]}</span>
          </div>

          <div className="form-group row">
            <label htmlFor="fullname" className="col-12 col-form-label text-secondary"><FaUserCircle></FaUserCircle> Tên người dùng </label>
            <div className="col-12">
              <input
                required
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                onChange={this.handleChange.bind(this, "fullname")} value={this.state.fields["fullname"]|| ''} />
            </div>
            <span style={{color: "red",paddingLeft:"10px"}}>{this.state.errors["fullname"]}</span>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-12 col-form-label text-secondary"><FaKey></FaKey> Mật khẩu</label>
            <div className="col-12">
              <input
                required
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]|| ''}/>
            </div>
            <span style={{color: "red",paddingLeft:"10px"}}>{this.state.errors["password"]}</span>
          </div>
          <div className="form-group row">
            <label htmlFor="repeatpassword" className="col-12 col-form-label text-secondary"><FaKey></FaKey> Nhập lại mật khẩu</label>
            <div className="col-12">
              <input
                required
                type="password"
                className="form-control"
                id="repeatpassword"
                name="repeatpassword"
                onChange={this.handleChange.bind(this, "repeatpassword")} value={this.state.fields["repeatpassword"]|| ''}/>
            </div>
            <span style={{color: "red",paddingLeft:"10px"}}>{this.state.errors["repeatpassword"]}</span>
          </div>
    
          <div className="form-group row">
            <div className="col-md-12 text-center">
              <button className="btn btn-success w-50 center" onClick={this.contactSubmit.bind(this)}>Thêm người dùng</button>
              <div className="col mt-3"></div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
  }
};

function mapStateToProps(state) {
  let result = {
      token: state.user.jwtToken
  };
  console.log(state);
  return result;
}

export default connect(mapStateToProps,null)(AdminForm);