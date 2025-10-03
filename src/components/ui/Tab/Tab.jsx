import { ClipboardClock, NotebookPen } from 'lucide-react';
import './Tab.css';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';
function Tab({ children, isActive, name }) {
  return (
    <NavLink to={''}>
      <div className={`tab ${isActive ? 'tab--active' : ''}`}>
        {name === 'cita' && <NotebookPen />}
        {name === 'hc' && <ClipboardClock />}
        <div>{children}</div>
      </div>
    </NavLink>
  );
}

Tab.propTypes = {
  children: PropTypes.node, // cualquier nodo React válido
  isActive: PropTypes.bool.isRequired, // booleano requerido
  name: PropTypes.oneOf(['appointment', 'hc']).isRequired, // restringido a esos valores
};

export default Tab;
