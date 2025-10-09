import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

export function Card({ children, path }) {
  const cardClasses = `
    bg-[var(--color-primary-soft)]
    rounded-[var(--radius-lg)]
    min-h-[130px]
    min-w-[300px]
    px-[30px] py-[18px]
    gap-5
    text-[1.3rem]
    flex
    justify-center
    items-center
    transition-all
    duration-200
    ease-in-out
    text-[var(--color-white)]
    hover:shadow-[var(--shadow-lg)]
    hover:cursor-pointer
    hover:-translate-y-[5px]
    no-underline
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <NavLink to={path} className={cardClasses}>
      {children}
    </NavLink>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
