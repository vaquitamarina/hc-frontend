import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import './Button.css';

const Button = ({
  variant = 'primary',
  onClick,
  disabled = false,
  children,
  to, // nueva prop
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      className={`btn btn-${variant}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string, // la ruta a navegar
};

export default Button;
