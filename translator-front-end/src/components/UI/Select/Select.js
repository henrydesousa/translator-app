import React from 'react';
import PropTypes from 'prop-types';

const select = ({
 value, changed, elementConfig, label 
}) => (
  <div className="input-field">
    <select className="icons" value={value} onChange={changed}>
      {elementConfig.options.map(option => (
        <option
          key={option.value}
          value={option.value}
          data-icon={option.icon}
          disabled={option.disabled}
        >
          {option.displayValue}
        </option>
      ))}
    </select>
    <label>{label}</label>
  </div>
);

select.propTypes = {
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default select;
