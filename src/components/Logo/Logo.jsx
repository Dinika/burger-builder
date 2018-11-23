import React from 'react';
import logo from '../../assets/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt="MyBurger Logo"/>
    </div>
);

export default Logo;