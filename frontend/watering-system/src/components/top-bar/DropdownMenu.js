import React, {useState} from 'react';
import {Link} from 'react-router-dom';

// Utils
import {getClassName} from '../../utils/component-utils';

// Style
import style from './topbar.module.scss';

export default function DropDownMenu(props) {
  let [innerActive, setInnerActive] = useState(true);

  let inlineStyle = {
    display: 'none'
  };

  if (props.active === innerActive) {
    inlineStyle.display = 'block';
  }

  return (
    <ul className="nav-item dropdown">
      <div className={getClassName("dropdown-menu dropdown-menu-right shadow-sm", style.dropdownItem)}
           style={inlineStyle}>
        {
          props.links.map(x => {
            return <Link className="dropdown-item" to={x.to} key={x.to}
                         onClick={() => setInnerActive(x => !x)}>{x.name}</Link>
          })
        }
      </div>
    </ul>
  );
}