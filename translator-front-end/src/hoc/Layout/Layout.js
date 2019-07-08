import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = ({ children }) => (
  <React.Fragment>
    <Toolbar />
    <div className="section no-pad-bot">
      <div className="container">
        <br />
        <br />
        {children}
      </div>
    </div>
  </React.Fragment>
);

layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default layout;
