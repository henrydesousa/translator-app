import React from 'react';
import Answer from './Answer/Answer';

const answers = (props) => {
    return (
        <div className="row center">
            <div className="row center">
                <h5 className="header col s12 light orange-text">Your answers</h5>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Verb</th>
                        <th>You entered</th>
                        <th>Correct</th>
                    </tr>
                </thead>

                <tbody>
                    {props.answers.map((answer, index) => (
                        <Answer key={index}
                            verb={answer.verb}
                            answer={answer.answer}
                            correct={answer.correct} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default answers;