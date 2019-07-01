import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul id={props.id} className={props.classes}>
        <NavigationItem link="/leaderboard">Leaderboard</NavigationItem>
        <NavigationItem link="/auth">Log in</NavigationItem>
    </ul>
);

export default navigationItems;