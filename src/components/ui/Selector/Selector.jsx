import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Selector.css';

const Selector = ({ options, onChange, defaultValue, disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectorRef = useRef(null);

  useEffect(() => {
    const initialOption = options.find(
      (opt) => (typeof opt === 'object' ? opt.value : opt) === defaultValue
    );
    if (initialOption) {
      const value =
        typeof initialOption === 'object' ? initialOption.value : initialOption;
      const label =
        typeof initialOption === 'object' ? initialOption.label : initialOption;
      setSelectedValue(value);
      setSelectedLabel(label);
    } else {
      setSelectedValue(null);
      setSelectedLabel('Select an option');
    }
  }, [options, defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectorRef]);

  const handleSelect = (option) => {
    const value = typeof option === 'object' ? option.value : option;
    const label = typeof option === 'object' ? option.label : option;

    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);

    if (onChange) {
      onChange(value);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const getLabel = () => {
    if (selectedLabel) {
      return selectedLabel;
    }
    return 'Select an option';
  };

  return (
    <div className={`selector-container ${className || ''}`} ref={selectorRef}>
      <div className={`selector-wrapper ${disabled ? 'disabled' : ''}`}>
        <div
          className={`selector-placeholder ${isOpen ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={toggleDropdown}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && toggleDropdown()
          }
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          tabIndex={disabled ? -1 : 0}
        >
          <span>{getLabel()}</span>
          <span className={`selector-icon ${isOpen ? 'open' : ''}`}>▼</span>
        </div>

        {isOpen && !disabled && (
          <ul className="selector-options" role="listbox">
            {options.map((option) => {
              const optionValue =
                typeof option === 'object' ? option.value : option;
              const optionLabel =
                typeof option === 'object' ? option.label : option;
              const isSelected = optionValue === selectedValue;

              return (
                <li
                  key={optionValue}
                  className={`selector-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && handleSelect(option)
                  }
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                >
                  {optionLabel}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Selector.defaultProps = {
  defaultValue: null,
  disabled: false,
  className: '',
};

export default Selector;
