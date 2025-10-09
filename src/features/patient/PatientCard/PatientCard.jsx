import './PatientCard.css';
import Avatar from '@ui/Avatar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
import { useForm } from '@stores/useForm';
function PatientCard({
  name,
  img,
  date,
  type = 'default',
  idHistory,
  handleClick,
}) {
  const newHandleClick = () => {
    handleClick();
    useForm.setState({ isFormMode: false });
  };
  return (
    <NavLink
      to={`/historia/${idHistory}/anamnesis`}
      className={`patient-card patient-card--${type}`}
      onClick={newHandleClick}
    >
      <Avatar src={img} alt={name} size={'3rem'} />
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
  handleClick: PropTypes.func,
};

export default PatientCard;
