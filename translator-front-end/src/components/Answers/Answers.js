import React from 'react';
import Answer from './Answer/Answer';

const answers = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Verb</th>
                    <th>You entered</th>
                    <th>Correct</th>
                </tr>
            </thead>

            <tbody>
                {props.answers.map(answer => (
                    <Answer key={answer.id}
                            verb={answer.verb} 
                            answer={answer.answer} 
                            correct={answer.correct} />
                ))}
            </tbody>
        </table>
    );
};

export default answers;