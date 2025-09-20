import './PatientCard.css';
import Avatar from '../../ui/Avatar/Avatar';

import PropTypes from 'prop-types';
function PatientCard({ name, img, date, type = 'default' }) {
  return (
    <div className={`patient-card patient-card--${type}`}>
      <Avatar src={img} alt={name} size={65} />
      <div className="patient-card__info">
        <div className="patient-card__name">{name}</div>
        <div className="patient-card__date">{date}</div>
      </div>
    </div>
  );
}

PatientCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'soft']),
};

export default PatientCard;
