import PropTypes from 'prop-types';
import NavButton from '@ui/NavButton/NavButton';
import Tab from '@ui/Tab/Tab';
import './Sidebar.css';

const Sidebar = ({ title, items }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__tabs">
        <Tab isActive={true} name="hc">
          HISTORIA CLÍNICA
        </Tab>
      </div>

      <div className="sidebar__header">
        <h2 className="sidebar__title">{title}</h2>
      </div>

      <nav className="sidebar__nav" aria-label={`${title} navigation`}>
        {items.map((item, index) => (
          <NavButton key={index} to={item.path}>
            {item.label} {/*asd*/}
          </NavButton>
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
