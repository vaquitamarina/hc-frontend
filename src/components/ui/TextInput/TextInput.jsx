import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

function TextInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  id,
  type = 'text',
}) {
  return (
    <div className="text-input">
      <label htmlFor={id} className="text-input__label">
        {label}
      </label>
      <div className="text-input__wrapper">
        <input
          type={type}
          id={id}
          className={`text-input__field${error ? ' text-input__field--error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <span className="text-input__error-message">{error}</span>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  error: '',
  type: 'text',
};

export default TextInput;
