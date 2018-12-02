import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationMenu.module.css';

const NavigationMenu = (props) => (
    <ul className={classes.NavigationMenu}>
        <NavigationItem link="/">BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default NavigationMenu;