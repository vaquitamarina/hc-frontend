import React from 'react';
import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

// Definir variantes del TextInput usando tailwind-variants
const textInputContainer = tv({
  base: ['my-4'],
});

const textInputLabel = tv({
  base: ['block', 'mb-1.5', 'font-medium', 'text-[var(--color-text)]'],
});

const textInputWrapper = tv({
  base: ['relative', 'w-full'],
});

const textInputField = tv({
  base: [
    'w-full',
    'px-4 py-3',
    'border-2',
    'rounded-[var(--radius-md)]',
    'bg-[var(--color-surface)]', // Se usa color surface por defecto
    'shadow-[var(--shadow-sm)]',
    'text-base',
    'text-[var(--color-text)]',
    'outline-none',
    'transition-all',
    'duration-200',
    'ease-in-out',
    // Estilos para estado disabled
    'disabled:opacity-60',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-100', // Fondo gris claro al estar deshabilitado
    'disabled:border-gray-200',
  ],
  variants: {
    hasError: {
      true: ['!border-[var(--color-danger)]'],
      false: [
        'border-[var(--color-secondary-soft)]',
        'focus:border-[var(--color-accent)]',
        'focus:shadow-[var(--shadow-md)]',
      ],
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

const textInputError = tv({
  base: [
    'absolute',
    'left-0',
    'bottom-[-18px]',
    'text-[var(--color-danger)]',
    'text-xs',
    'font-normal',
  ],
});

function TextInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  type = 'text',
  disabled, // Recibimos la propiedad disabled
  ...props
}) {
  const hasError = !!error;

  return (
    <div className={textInputContainer()}>
      {label && (
        <label htmlFor={name} className={textInputLabel()}>
          {label}
        </label>
      )}
      <div className={textInputWrapper()}>
        <input
          type={type}
          id={name}
          name={name}
          className={textInputField({ hasError })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled} // Aplicamos la propiedad al input nativo
          {...props}
        />
        {error && <span className={textInputError()}>{error}</span>}
      </div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string, // Hice opcional el label para mayor flexibilidad
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Acepta números también
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool, // Validación de propType
};

TextInput.defaultProps = {
  placeholder: '',
  error: '',
  type: 'text',
  disabled: false,
};

export default TextInput;
