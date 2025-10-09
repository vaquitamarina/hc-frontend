import { NavLink } from 'react-router';
import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

// Definir variantes del NavButton usando tailwind-variants
// Optimizado para uso exclusivo en sidebar/navbar
const navButton = tv({
  base: [
    'block',
    'text-left',
    'px-10 py-3',
    'bg-transparent',
    '!text-[var(--color-white)]',
    'rounded-l-xl',
    'rounded-r-none',
    'w-[calc(100%+28px)]',
    'mx-[-14px]',
    'box-border',
    'text-base',
    'cursor-pointer',
    'border-none',
    'transition-all',
    'duration-[180ms]',
    'ease-in-out',
    '!no-underline',
    'hover:!bg-[var(--color-background)]',
    'hover:!text-black',
  ],
  variants: {
    isActive: {
      true: [
        '!bg-[var(--color-background)]',
        '!text-black',
        'font-semibold',
        'shadow-[var(--shadow-sm)]',
      ],
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

const NavButton = ({ to, children }) => {
  return (
    <NavLink to={to} className={({ isActive }) => navButton({ isActive })}>
      {children}
    </NavLink>
  );
};

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavButton;
