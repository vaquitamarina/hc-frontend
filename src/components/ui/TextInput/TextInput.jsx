import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

function TextInput({ label, placeholder, value, onChange, error, id }) {
  return (
    <div className="text-input-container">
      <label htmlFor={id} className="text-input-label">
        {label}
      </label>
      <div className="text-input-wrapper">
        <input
          type="text"
          id={id}
          className={`text-input-field${error ? ' text-input-error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  id: PropTypes.string,
};

export default TextInput;
