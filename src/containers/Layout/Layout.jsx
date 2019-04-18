import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../HOC/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

const Layout = props => {
  const [isSideDrawerOpned, setIsSideDrawerOpened] = useState(false);

  function onSideDrawerOpened() {
    setIsSideDrawerOpened(true);
  }

  function onSideDrawerClosed() {
    setIsSideDrawerOpened(false);
  }

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        onSideDrawerOpened={onSideDrawerOpened}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        sideDrawerOpened={isSideDrawerOpned}
        onSideDrawerClosed={onSideDrawerClosed}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null
  };
};

export default connect(mapStateToProps)(Layout);
