import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { getClassName } from '../../utils/component-utils';

// Style
import style from './topbar.module.scss';

export default function DropDownMenu(props) {
  let inlineStyle = {
    display: 'none'
  };

  if (props.active === true) {
    inlineStyle.display = 'block';
  }

  return (
    <ul className="nav-item dropdown">
      <div className={getClassName("dropdown-menu dropdown-menu-right shadow-sm", style.dropdownItem)} style={inlineStyle}>
        {
          props.links.map(x => {
            return <Link className="dropdown-item" to={x.to} key={x.to}>{x.name}</Link>
          })
        }
      </div>
    </ul>
  );
}