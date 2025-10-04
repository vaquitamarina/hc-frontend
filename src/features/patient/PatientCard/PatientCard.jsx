import './PatientCard.css';
import Avatar from '@ui/Avatar/Avatar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
function PatientCard({
  name,
  img = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
  date,
  type = 'default',
  idHistory,
}) {
  return (
    <NavLink
      to={`/historia-clinica/${idHistory}`}
      className={`patient-card patient-card--${type}`}
    >
      <Avatar src={img} alt={name} size={65} />
      <div className="patient-card__info">
        <div className="patient-card__name">{name}</div>
        <div className="patient-card__date">{date}</div>
      </div>
    </NavLink>
  );
}

PatientCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'soft']),
  idHistory: PropTypes.string.isRequired,
};

export default PatientCard;
