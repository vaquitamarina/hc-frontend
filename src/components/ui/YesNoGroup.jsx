import PropTypes from 'prop-types';

const YesNoGroup = ({ label, value, onChange, disabled }) => (
  <div className="mb-3 flex items-center justify-between max-w-xs">
    <span className="text-sm font-bold text-gray-700 mr-4">{label}</span>
    <div className="flex gap-4">
      <label
        className={`flex items-center gap-1 cursor-pointer ${disabled ? 'opacity-60' : ''}`}
      >
        <input
          type="radio"
          checked={value === true}
          onChange={() => onChange(true)}
          disabled={disabled}
          className="accent-[var(--color-primary)] w-4 h-4"
        />
        <span className="text-sm">Sí</span>
      </label>
      <label
        className={`flex items-center gap-1 cursor-pointer ${disabled ? 'opacity-60' : ''}`}
      >
        <input
          type="radio"
          checked={value === false}
          onChange={() => onChange(false)}
          disabled={disabled}
          className="accent-[var(--color-primary)] w-4 h-4"
        />
        <span className="text-sm">No</span>
      </label>
    </div>
  </div>
);

YesNoGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default YesNoGroup;
