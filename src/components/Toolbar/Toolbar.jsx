import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import ToggleMenuIcon from '../SideDrawer/ToggleMenuIcon/ToggleMenuIcon';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleMenuIcon onSideDrawerOpened={props.onSideDrawerOpened} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationMenu />
        </nav>
        
    </header>
)

export default Toolbar;
