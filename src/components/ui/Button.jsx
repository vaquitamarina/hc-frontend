import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { tv } from 'tailwind-variants';

// Definir las variantes del botón usando tailwind-variants
const button = tv({
  base: [
    'px-5 py-2.5',
    'rounded-xl',
    'text-xs font-medium',
    'cursor-pointer',
    'transition-colors duration-200 ease-in-out',
  ],
  variants: {
    variant: {
      primary: [
        'bg-[var(--color-primary-soft)]',
        'text-white',
        'hover:bg-[var(--color-primary-hover)]',
        'border-none',
      ],
      secondary: [
        'bg-[var(--color-background)]',
        'border-2 border-[var(--color-primary-soft)]',
        'text-[var(--color-text)]',
        'hover:bg-[var(--color-secondary-hover)]',
        'hover:text-[var(--color-white)]',
      ],
      danger: [
        'bg-[var(--color-danger)]',
        'text-white',
        'hover:bg-[var(--color-danger-hover)]',
      ],
    },
    disabled: {
      true: ['opacity-60', 'cursor-not-allowed'],
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      class: 'hover:bg-[var(--color-primary-soft)]',
    },
    {
      variant: 'secondary',
      disabled: true,
      class:
        'hover:bg-[var(--color-background)] hover:text-[var(--color-text)]',
    },
    {
      variant: 'danger',
      disabled: true,
      class: 'hover:bg-[var(--color-danger)]',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    disabled: false,
  },
});

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
      className={button({ variant, disabled })}
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
