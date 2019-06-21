import React from 'react';
import { Navbar, NavItem } from 'react-materialize';

const toolbar = (props) => (
    <Navbar brand={<a id="logo-container" href="/">Translator</a>} 
            alignLinks="right"
            className="light-blue lighten-1">
        <NavItem href="">
            Leaderboard
        </NavItem>
        <NavItem href="components.html">
            Log in
        </NavItem>
    </Navbar>
);

export default toolbar;