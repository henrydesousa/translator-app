import React from 'react';
import PropTypes from 'prop-types';

const button = ({ children }) => (
  <button type="submit" className="btn-large waves-effect waves-light orange">
    {children}
  </button>
);

button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default button;
