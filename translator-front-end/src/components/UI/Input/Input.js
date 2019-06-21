import React from 'react';

const input = (props) => {
    return (
        <div className="input-field">
            <input type={props.type} disabled={props.disabled} value={props.value} />
            <label>{props.label}</label>
        </div>
    );
};

export default input;