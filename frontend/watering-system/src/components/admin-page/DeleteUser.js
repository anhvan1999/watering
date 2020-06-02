import React from 'react';
import TopBar from '../top-bar/TopBar';
import style from './UserInfo.scss';

export default function DeleteUser(props){
    
    
    let DeleteUserBtnHandle = (id) => {

      };
        return (
           

            <div id="user-info">
                 <TopBar></TopBar>
                {
                    <div id="info" className="info">
                    
                        <h1 className="text-center text-primary"> Thông tin người dùng </h1>
                    <br></br>
                        <table className="table table-hover">
                            <thead className="thead-light">
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
                                    <td><button className="btn btn-primary" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                               
                                <tr>
                                    <td>B</td>
                                    <td>2</td>
                                    <td>User</td>
                                    <td><button className="btn btn-primary" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                                <tr>
                                    <td>C</td>
                                    <td>3</td>
                                    <td>User</td>
                                    <td><button className="btn btn-primary" id="btn-delete-1" onClick = {DeleteUserBtnHandle}>Xóa người dùng</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                }
            
            </div>            
        );
    }

