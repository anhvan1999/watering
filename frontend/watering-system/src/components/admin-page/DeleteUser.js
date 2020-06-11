import React from 'react';
import TopBar from '../top-bar/TopBar';
import style from './UserInfo.scss';
import {FaUserPlus} from 'react-icons/fa';
import { useRouteMatch } from 'react-router-dom';


export default function DeleteUser(props){
    let match = useRouteMatch();
    let DeleteUserBtnHandle = (id) => {

      };
        return (
           

            <div id="list-info">
                 <TopBar></TopBar>
                {
                    <div className="infolist">
                     <div className="card-header">
                    <h3 className="text-center text-primary">Thông tin người dùng</h3> 
                    </div>
                    <label className="col-12 col-form-label text-secondary text-center"><FaUserPlus></FaUserPlus> <a href={`${match.url}/add`}>Thêm người dùng</a></label>

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
                                <tr>
                                    <td>A</td>
                                    <td>1</td>
                                    <td>User</td>
                                    <td><button className="btn btn-danger" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                               
                                <tr>
                                    <td>B</td>
                                    <td>2</td>
                                    <td>User</td>
                                    <td><button className="btn btn-danger" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                                <tr>
                                    <td>C</td>
                                    <td>3</td>
                                    <td>User</td>
                                    <td><button className="btn btn-danger" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                    
                }
            

            </div>  
            
           
        );
    }

