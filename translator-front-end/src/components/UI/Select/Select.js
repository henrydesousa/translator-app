import React from 'react';

const select = (props) => {
    return (
        <div className="input-field">
            <select 
                className="icons"
                defaultValue={props.defaultValue}>
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
};

export default select;