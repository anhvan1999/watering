import React from 'react';
import style from './userinfo.module.scss';

class HistoryItem extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <span className={style.ActivityItemList}>{this.props.eventName}</span>
                <span className={style.ActivityItemTime}>{
                   this.props.eventTime}</span>
            </li>

        );
    }
}


export default HistoryItem
