import React from 'react';
import TopBar from '../top-bar/TopBar';
import './UserInfo.scss';
import { connect } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';

import axios from '../../utils/axios-instance';

class DeleteUser extends React.Component {
  //let [listuser, setListuser] = useState([]);
   
  constructor(props){
    super(props);
    this.DeleteUserBtnHandle=this.DeleteUserBtnHandle.bind(this);
    this.state = {
        userlist : [],
        match: this.match
    }
}

  componentDidMount () {
    console.log(this.props);
    axios.get('/admin', {
        headers: {
            'Authorization': `jwt ${this.props.token}`
        }
    }).then(res => {
      this.setState({userlist: res.data});
    }).catch(error => {
        console.log(error);
    });
}

  
DeleteUserBtnHandle(id,name) {
  if (this.props.username === name){
     alert("Bạn không thể tự xóa bản thân!");
  }
  else {
    axios.post('/admin', {"id":id}, {
      headers: {
          'Authorization': `jwt ${this.props.token}`
    }
  }).then(res => {
    this.setState({userlist: res.data});
    alert("Xóa user thành công !");
  }).catch(error => {
      console.log(error);
  });
  }
};

  render(){
   
  return (
    <div id="list-info">
      <TopBar></TopBar>
      {
        <div className="infolist">
          <div className="card-header">
            <h3 className="text-center text-primary">Thông tin người dùng</h3>
          </div>
          <label className="col-12 col-form-label text-secondary text-center"><FaUserPlus></FaUserPlus> <a href={`admin/add`}>Thêm người dùng</a></label>

          <br></br>
          <div className="card-body">

            <div className="table-resonsive">
              <table className="Table Table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Họ tên</th>
                    <th>ID</th>
                    <th>Quyền </th>
                    <th>Thao tác </th>
                  </tr>
                </thead>
                <tbody>   
                  {
                    this.state.userlist.map((user,index)=> {
                      return (<tr key={index}>
                      <td> {user.username}</td>
                      <td> {user.id}</td>
                      <td> {user.authorities[0].authority}</td>
                      <td>
                        <button className="btn btn-danger"
                        value = {user.id}
                        name = {user.username}
                        onClick={e => this.DeleteUserBtnHandle(e.target.value,e.target.name)}
                          >Xóa người dùng</button></td>
                    </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      }


    </div>
  

  );
    }
}
function mapStateToProps(state) {
  let result = {
      token: state.user.jwtToken,
      username: state.user.username
  };
  console.log("state",state);
  return result;
}

export default connect(mapStateToProps,null)(DeleteUser);
