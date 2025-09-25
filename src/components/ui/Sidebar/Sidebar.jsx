import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
import './Sidebar.css';

const Sidebar = ({ title, items }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">{title}</h2>

      <nav className="sidebar__nav">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
