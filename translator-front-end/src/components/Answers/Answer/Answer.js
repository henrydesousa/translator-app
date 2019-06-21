import React from 'react';

const answer = (props) => {
    return (
        <tr>
            <td>{props.verb}</td>
            <td>{props.answer}</td>
            <td>{props.correct}</td>
        </tr>
    );
};

export default answer;