import './Avatar.css';

import PropTypes from 'prop-types';
function Avatar({ src, alt, size = 50 }) {
  return (
    <img
      className="avatar"
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
      }}
    ></img>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Avatar;
