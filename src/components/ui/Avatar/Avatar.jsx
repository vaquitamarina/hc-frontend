import { CircleUserRound } from 'lucide-react';
import PropTypes from 'prop-types';

function Avatar({ src, alt, size = 50 }) {
  if (!src) {
    return (
      <div className="inline-block">
        <CircleUserRound
          size={size}
          strokeWidth={1}
          style={{ color: 'var(--color-primary)' }}
        />
      </div>
    );
  }

  return (
    <img
      className="rounded-full object-cover"
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
};

export default Avatar;
