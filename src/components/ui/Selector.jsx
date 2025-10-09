import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

// Definir variantes del Selector usando tailwind-variants
const selectorContainer = tv({
  base: ['my-4', 'font-[Alexandria]'],
});

const selectorWrapper = tv({
  base: ['relative', 'w-full'],
});

const selectorPlaceholder = tv({
  base: [
    'flex',
    'justify-between',
    'items-center',
    'px-4 py-3',
    'border-2',
    'rounded-[var(--radius-md)]',
    'bg-[var(--color-white)]',
    'cursor-pointer',
    'shadow-[var(--shadow-md)]',
    'transition-all',
    'duration-200',
    'ease-in-out',
  ],
  variants: {
    isActive: {
      true: 'border-[var(--color-primary)]',
      false:
        'border-[var(--color-primary-soft)] hover:border-[var(--color-primary)]',
    },
    disabled: {
      true: [
        'bg-[var(--color-secondary-soft)]',
        'cursor-not-allowed',
        'opacity-70',
      ],
    },
  },
  defaultVariants: {
    isActive: false,
    disabled: false,
  },
});

const selectorIcon = tv({
  base: [
    'transition-transform',
    'duration-200',
    'ease-in-out',
    'text-xl',
    'text-[var(--color-primary)]',
  ],
  variants: {
    isOpen: {
      true: 'rotate-180',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

const selectorOptions = tv({
  base: [
    'absolute',
    'top-full',
    'left-0',
    'right-0',
    'mt-1',
    'border-2',
    'border-[var(--color-primary)]',
    'rounded-[var(--radius-md)]',
    'bg-[var(--color-white)]',
    'z-10',
    'list-none',
    'p-0',
    'max-h-[200px]',
    'overflow-y-auto',
    'shadow-[var(--shadow-lg)]',
    'animate-[fadeIn_0.3s_ease-in-out]',
  ],
});

const selectorOption = tv({
  base: [
    'px-4 py-3',
    'cursor-pointer',
    'transition-colors',
    'duration-200',
    'font-normal',
    'text-[var(--color-text)]',
  ],
  variants: {
    isSelected: {
      true: [
        'bg-[var(--color-secondary)]',
        'font-bold',
        'text-[var(--color-white)]',
      ],
      false: 'hover:bg-[var(--color-secondary-soft)]',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

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
    <div
      className={`${selectorContainer()} ${className || ''}`}
      ref={selectorRef}
    >
      <div className={selectorWrapper()}>
        <div
          className={selectorPlaceholder({ isActive: isOpen, disabled })}
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
          <span className={selectorIcon({ isOpen })}>▼</span>
        </div>

        {isOpen && !disabled && (
          <ul className={selectorOptions()} role="listbox">
            {options.map((option) => {
              const optionValue =
                typeof option === 'object' ? option.value : option;
              const optionLabel =
                typeof option === 'object' ? option.label : option;
              const isSelected = optionValue === selectedValue;

              return (
                <li
                  key={optionValue}
                  className={selectorOption({ isSelected })}
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
