import React from 'react';
import classes from './ToggleMenuIcon.module.css';

const ToggleMenuIcon = (props) => (
    <div className={classes.ToggleMenuIcon} onClick={props.onSideDrawerOpened}>
        <div></div>
        <div></div>
        <div></div>        
    </div>
);

export default ToggleMenuIcon;