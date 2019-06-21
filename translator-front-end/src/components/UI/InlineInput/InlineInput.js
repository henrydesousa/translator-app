import React from 'react';

const inlineInput = (props) => {
    return (
        <React.Fragment>
            <b>{props.description}</b>:
            <div className="input-field inline">
                <input type="text" />
                <label>{props.label}</label>
            </div>             
        </React.Fragment>
    );
};

export default inlineInput;