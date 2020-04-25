import React from 'react';
import {connect} from 'react-redux';
import {toggleSidebar} from '../../redux-store/actions/ui-actions';

// Style
import style from './topbar.module.scss';

// Utils
import {getClassName} from '../../utils/component-utils';

// Component
import {Link} from 'react-router-dom';
import NavbarCollapse from './NavBarCollapse';
import UserArea from './UserArea';

function TopBar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info fixed-top shadow">
      {/* Toggle button */}
      <button className={getClassName("navbar-toggler", style.toggleButton)} type="button" data-toggle="collapse" aria-expanded="false" onClick={props.toggleSidebar}>
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Branch */}
      <Link className="navbar-brand" to="/">
        <img src={require('./water.png')} alt="Watering Manager" width="30" height="30"></img> Watering</Link>

      {/* Collapse */}
      <NavbarCollapse></NavbarCollapse>

      {/* User area */}
      <UserArea></UserArea>
    </nav>
  );
}

// Map dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar())
  }
}

export default connect(null, mapDispatchToProps)(TopBar);
