import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Redux actions
import {toggleSidebar} from '../../redux-store/actions/ui-actions';

// Style
import style from './topbar.module.scss';

// Utils
import {getClassName} from '../../utils/component-utils';

function NavbarCollapse(props) {
  let status = '';

  if (props.active === true) {
    status = style.Active;
  } else if (props.active === false && props.firstRender === false) {
    status = style.Inactive;
  }
  
  return (
    <div className={getClassName("collapse navbar-collapse mr-auto", style.MyNavBarCollapse, status)}>
      <ul className="navbar-nav mr-auto mt-0">
        <li className="nav-item active" onClick={props.toggleSidebar}>
          <Link to="/" className="nav-link">Trang chủ</Link>
        </li>
        <li className="nav-item" onClick={props.toggleSidebar}>
          <Link to="/child" className="nav-link">Cảm biến</Link>
        </li>
        <li className="nav-item" onClick={props.toggleSidebar}>
          <Link to="/child/foo" className="nav-link">Lịch sử</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown</a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/">Action</a>
            <a className="dropdown-item" href="/">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/">Something else here</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    active: state.ui.sideBarActive,
    firstRender: state.ui.sideBarFirstRender
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: () => {
      if (window.innerWidth < 768) {
        dispatch(toggleSidebar())
      } 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarCollapse);
