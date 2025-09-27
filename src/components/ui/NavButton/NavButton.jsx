import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import './NavButton.css';

const NavButton = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="nav-button" onClick={handleClick} type="button">
      {children} {/* Aquí va cualquier contenido */}
    </button>
  );
};

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // ahora validamos children
};

export default NavButton;
