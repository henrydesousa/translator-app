import React from 'react';
import PropTypes from 'prop-types';

const input = ({
 type, disabled, value, label 
}) => (
  <div className="input-field">
    <input type={type} disabled={disabled} value={value} />
    <label>{label}</label>
  </div>
);

input.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
};

input.defaultProps = {
  disabled: false,
  value: '',
};

export default input;
