import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import './Button.css';

const Button = ({
  variant = 'primary',
  type,
  onClick,
  disabled = false,
  children,
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      className={`button button--${variant} ${disabled ? 'button--disabled' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string, // la ruta a navegar
};

export default Button;
