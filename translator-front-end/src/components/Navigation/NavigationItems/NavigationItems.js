import React from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ id, classes }) => (
  <ul id={id} className={classes}>
    <NavigationItem link="/leaderboard">Leaderboard</NavigationItem>
    <NavigationItem link="/auth">Log in</NavigationItem>
  </ul>
);

navigationItems.propTypes = {
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.string,
  classes: PropTypes.string.isRequired,
};

export default navigationItems;
