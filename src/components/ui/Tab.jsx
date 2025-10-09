import { ClipboardClock, NotebookPen } from 'lucide-react';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

function Tab({ children, isActive, name }) {
  return (
    <div className="flex-1">
      <NavLink className="no-underline">
        <div
          className={`flex flex-row justify-center items-center px-12 py-2 rounded-[var(--radius-md)] gap-6 whitespace-nowrap text-xs transition-colors duration-200 ease-in-out no-underline ${
            isActive
              ? 'bg-[var(--color-primary)] text-[var(--color-white)]'
              : 'bg-[var(--color-white)] text-[var(--color-primary)]'
          }`}
        >
          {name === 'cita' && <NotebookPen />}
          {name === 'hc' && <ClipboardClock />}
          <div>{children}</div>
        </div>
      </NavLink>
    </div>
  );
}

Tab.propTypes = {
  children: PropTypes.node, // cualquier nodo React válido
  isActive: PropTypes.bool.isRequired, // booleano requerido
  name: PropTypes.oneOf(['cita', 'hc']).isRequired, // restringido a esos valores (corregido)
};

export default Tab;
