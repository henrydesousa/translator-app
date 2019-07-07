import React from 'react';
import PropTypes from 'prop-types';

const inlineInput = ({
 description, value, disabled, changed, label 
}) => (
  <React.Fragment>
    <b>{description}</b>

    <div className="input-field inline">
      <input type="text" value={value} disabled={disabled} onChange={changed} />
      <label>{label}</label>
    </div>
  </React.Fragment>
);

inlineInput.propTypes = {
  description: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  changed: PropTypes.func,
  label: PropTypes.string,
};

inlineInput.defaultProps = {
  disabled: false,
  label: '',
};

export default inlineInput;
