import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../HOC/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    sideDrawerOpened: false
  };

  onSideDrawerOpened() {
    this.setState({
      sideDrawerOpened: true
    });
  }

  onSideDrawerClosed() {
    this.setState({
      sideDrawerOpened: false
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          onSideDrawerOpened={this.onSideDrawerOpened.bind(this)}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerOpened={this.state.sideDrawerOpened}
          onSideDrawerClosed={this.onSideDrawerClosed.bind(this)}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null
  };
};

export default connect(mapStateToProps)(Layout);
