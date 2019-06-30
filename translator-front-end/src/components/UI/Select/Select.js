import React from 'react';

const select = (props) => (
    <div className="input-field">
        <select
            className="icons"
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
                <option key={option.value}
                    value={option.value}
                    data-icon={option.icon}
                    disabled={option.disabled}>
                    {option.displayValue}
                </option>
            ))}
        </select>
        <label>{props.label}</label>
    </div>
);

export default select;