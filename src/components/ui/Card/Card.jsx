import { NavLink } from 'react-router';
import './Card.css';
import PropTypes from 'prop-types';
export function Card({ children }, path) {
  return (
    <NavLink to={path} className={'card'}>
      {children}
    </NavLink>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
