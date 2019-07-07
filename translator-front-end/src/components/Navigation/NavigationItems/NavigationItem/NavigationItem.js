import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const navigationItem = ({ link, exact, children }) => (
  <li>
    <NavLink to={link} exact={exact}>
      {children}
    </NavLink>
  </li>
);

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

navigationItem.defaultProps = {
  exact: false,
};

export default navigationItem;
