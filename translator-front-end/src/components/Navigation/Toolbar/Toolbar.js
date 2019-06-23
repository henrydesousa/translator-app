import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <nav className="light-blue lighten-1" role="navigation">
        <div className="container">
            <a id="logo-container" href="#" className="brand-logo">Translator</a>
            <NavigationItems classes="right hide-on-med-and-down" />
            <NavigationItems id="nav-mobile" classes="sidenav" />
            <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    </nav>
);

export default toolbar;