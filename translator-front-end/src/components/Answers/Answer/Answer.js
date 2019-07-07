import React from 'react';
import PropTypes from 'prop-types';

const answer = ({ verb, userAnswer, correct }) => (
  <tr>
    <td>{verb}</td>
    <td>{userAnswer}</td>
    <td>{correct}</td>
  </tr>
);

answer.propTypes = {
  verb: PropTypes.string.isRequired,
  userAnswer: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
};

export default answer;
