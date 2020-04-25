import React, { useState } from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';

// Style
import style from './topbar.module.scss';

// Child component
import DropdownMenu from './DropdownMenu';

export default function UserArea() {
  let linkList = [
    { to: "/", name: "Thông tin chi tiết" },
    { to: "/child", name: "Đăng Xuất" }
  ];

  let [active, setActive] = useState(false);

  return (
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
        {/* User Avatar */}
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
          onClick={() => { setActive(x => !x); }}>
          <img src={require("./user-default.jpg")} width="30px" height="30px" className="rounded-circle"></img></a>
        
        {/* Dropdown menu */}
        <DropdownMenu links={linkList} active={active}>
        </DropdownMenu>
      </li>
    </ul>
  );
}
