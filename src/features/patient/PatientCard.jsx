import Avatar from '@ui/Avatar';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
import { useForm } from '@stores/useForm';
import { tv } from 'tailwind-variants';

// Definir variantes del PatientCard usando tailwind-variants
const patientCard = tv({
  base: [
    'rounded-[var(--radius-lg)]',
    'flex',
    'flex-row',
    'h-auto',
    'p-4',
    'gap-4',
    'text-base',
    'transition-all',
    'duration-200',
    'ease-in-out',
    '!no-underline',
    'hover:shadow-[var(--shadow-lg)]',
    'hover:cursor-pointer',
    'hover:-translate-y-[5px]',
  ],
  variants: {
    type: {
      default: ['bg-[var(--color-secondary)]'],
      soft: ['bg-[var(--color-secondary-soft)]'],
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

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
      className={patientCard({ type })}
      onClick={newHandleClick}
    >
      <Avatar src={img} alt={name} size={'3rem'} />
      <div className="flex flex-col gap-6">
        <div className="break-words">{name}</div>
        <div>{date}</div>
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
