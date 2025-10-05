import { NavLink } from 'react-router';
import PropTypes from 'prop-types';
import './NavButton.css';

const NavButton = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-button ${isActive ? 'nav-button--active' : ''}`
      }
    >
      {children}
    </NavLink>
  );
};

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavButton;
