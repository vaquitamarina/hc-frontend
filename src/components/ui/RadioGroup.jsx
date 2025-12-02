import PropTypes from 'prop-types';

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
  row = true,
}) => (
  <div className="mb-4">
    {label && (
      <label className="block font-bold text-[var(--color-text)] mb-2 text-sm">
        {label}
      </label>
    )}
    <div
      className={`flex ${row ? 'flex-row flex-wrap gap-6' : 'flex-col gap-2'}`}
    >
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-60' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="accent-[var(--color-primary)] w-5 h-5"
          />
          <span className="text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

RadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  row: PropTypes.bool,
};

export default RadioGroup;
