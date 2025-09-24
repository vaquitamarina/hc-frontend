// src/components/common/NavButton.jsx
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import './NavButton.css';

function NavButton({ to, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // redirige a la ruta indicada
  };

  return (
    <button className="nav-button" onClick={handleClick}>
      {label}
    </button>
  );
}

NavButton.propTypes = {
  to: PropTypes.string.isRequired, // Ruta destino
  label: PropTypes.string.isRequired, // Texto del botón
};

export default NavButton;
