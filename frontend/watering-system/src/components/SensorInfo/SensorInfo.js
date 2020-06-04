import React from 'react';
import TopBar from '../top-bar/TopBar';
import style from './sensorInfo.scss';



class SensorInfo extends React.Component {
    
    constructor(){
        super();
        this.state = {
            show: true,
            sensorID:0
        }
    }
    render(){
        return (
            <div id="sensor-info">
                {
                    this.state.show? 
                    <div id="info" className="info">
                        <h1>Thông tin cảm biến</h1>
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th>Cảm biến</th>
                                    <th>Số đo</th>
                                    <th>Trạng thái</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cảm biến 1</td>
                                    <td>80</td>
                                    <td>Ẩm</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:1})}}>Xem chi tiết</button></td>
                                </tr>
                                <tr>
                                    <td>Cảm biến 2</td>
                                    <td>86</td>
                                    <td>Ẩm</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:2})}}>Xem chi tiết</button></td>
                                </tr>
                                <tr>
                                    <td>Cảm biến 3</td>
                                    <td>47</td>
                                    <td>Khô</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:3})}}>Xem chi tiết</button></td>
                                </tr>
                                <tr>
                                    <td>Cảm biến 4</td>
                                    <td>47</td>
                                    <td>Khô</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:4})}}>Xem chi tiết</button></td>
                                </tr>
                                <tr>
                                    <td>Cảm biến 5</td>
                                    <td>47</td>
                                    <td>Khô</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:5})}}>Xem chi tiết</button></td>
                                </tr>
                                <tr>
                                    <td>Cảm biến 6</td>
                                    <td>47</td>
                                    <td>Khô</td>
                                    <td><button className="btn btn-primary" id="btn-sensor-1" onClick = {() => {this.setState({show:false, sensorID:6})}}>Xem chi tiết</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> :
                    <div id="info-detail" className="info">
                        <h1>Cảm biến {this.state.sensorID}</h1>
                        <button id= "turn-back"className ="btn btn-primary" onClick ={() => {this.setState({show:true})}}>Quay về</button>
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th>Thời gian</th>
                                    <th>Số đo</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jun 1 2020 10:00AM</td>
                                    <td>86</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:05AM</td>
                                    <td>84</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:10AM</td>
                                    <td>83</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:15AM</td>
                                    <td>82</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:20AM</td>
                                    <td>80</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:25AM</td>
                                    <td>80</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:30AM</td>
                                    <td>79</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:35AM</td>
                                    <td>78</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:40AM</td>
                                    <td>77</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:45AM</td>
                                    <td>76</td>
                                    <td>Ẩm</td>
                                </tr>
                                <tr>
                                    <td>Jun 1 2020 10:50AM</td>
                                    <td>76</td>
                                    <td>Ẩm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                }
                
                
            </div>
        );
    }
}

export default SensorInfo;