import React from 'react';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Logo from '../Logo/Logo';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    return(
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationMenu />
            </nav>
        </div>
    )
}

export default SideDrawer;