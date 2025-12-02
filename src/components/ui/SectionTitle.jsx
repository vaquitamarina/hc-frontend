import PropTypes from 'prop-types';

const SectionTitle = ({ title, className = '' }) => (
  <h3
    className={`text-[var(--color-primary)] font-bold text-lg border-b-2 border-gray-300 mb-4 mt-6 pb-1 uppercase ${className}`}
  >
    {title}
  </h3>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
