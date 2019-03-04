import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationMenu.module.css';
import Aux from '../../HOC/Aux';

const NavigationMenu = props => (
  <ul className={classes.NavigationMenu}>
    <NavigationItem link="/">BurgerBuilder</NavigationItem>
    {props.isAuthenticated ? (
      <Aux>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    ) : (
      <NavigationItem link="/login">Login</NavigationItem>
    )}
  </ul>
);

export default NavigationMenu;
