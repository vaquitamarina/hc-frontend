import React from 'react';
import PropTypes from 'prop-types';

function TextInput({ label, placeholder, value, onChange, error, id }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error">{error}</p>}
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
