import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const MenuExampleSecondaryPointing = () => {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.userName} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="signin"
          active={activeItem === 'signin'}
          onClick={handleItemClick}
          as={Link}
          to="/signin"
        />

        <Menu.Item
          name="signup"
          active={activeItem === 'signup'}
          onClick={handleItemClick}
          as={Link}
          to="/signup"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuExampleSecondaryPointing;
