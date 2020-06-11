import React from 'react';
import style from './userinfo.module.scss';


export default function HistoryItem(pros) {
    return (
        <li className="list-group-item">
            <span className={style.ActivityItemList}>{pros.eventName}</span>
            <span className={style.ActivityItemTime}>{
            new Intl.DateTimeFormat("en-GB", {
                hour : "numeric",
                minute:"numeric",
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(pros.eventTime)}</span>
        </li>

    );
}
