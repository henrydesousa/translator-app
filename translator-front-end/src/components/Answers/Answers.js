import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer/Answer';

const answers = ({ userAnswers }) => (
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
        {userAnswers.map(answer => (
          <Answer
            key={answer.verb}
            verb={answer.verb}
            userAnswer={answer.answer}
            correct={answer.correct}
          />
        ))}
      </tbody>
    </table>
  </div>
);

answers.propTypes = {
  userAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default answers;
