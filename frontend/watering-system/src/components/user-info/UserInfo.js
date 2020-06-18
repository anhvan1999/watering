import React from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';

// Style
import style from './userinfo.module.scss';
import DeleteAccountButton from './DeleteAccountButton';
import UserHistoryPanel from './UserHistoryPanel.js';
import UserInfoPanel from './UserInfoPanel.js';

class UserInfo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className={getClassName(style.ContentSection, "col-sm-12", style.clearfix)}>
          <div className="row">
            <div className="col-sm-3">
              <div className={getClassName(style.PanelBorderTop, style.Widget, style.LightWidget)}>
                <div className={getClassName(style.PanelHeading, style.NoTitle)}></div>
                <div className={getClassName(style.PanelBody)}>
                  <div className={getClassName(style.InfoParent, style.TextCenter)}>
                    <img alt="User info" src={require("./userinfo.png")} className="img-thumbnail" />
                  </div>
                  <p className={getClassName(style.UserNameSize, "text-center")}>User Name</p>
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className={getClassName(style.PanelBorderTop, style.Widget, style.LightWidget, style.Padding20)}>
                <UserInfoPanel></UserInfoPanel>
                <hr className={style.Padding10} />
                <UserHistoryPanel></UserHistoryPanel>
                <hr className={style.Padding10} />
                <DeleteAccountButton></DeleteAccountButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo