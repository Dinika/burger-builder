import React from 'react';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Logo from '../Logo/Logo';
import Aux from '../../HOC/Aux';
import Backdrop from '../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.sideDrawerOpened) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop
        onBackdropClicked={props.onSideDrawerClosed}
        showBackdrop={props.sideDrawerOpened}
      />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav onClick={props.onSideDrawerClosed}>
          <NavigationMenu isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
