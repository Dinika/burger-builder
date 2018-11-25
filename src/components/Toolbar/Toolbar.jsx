import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <NavigationMenu />
    </header>
)

export default Toolbar;
