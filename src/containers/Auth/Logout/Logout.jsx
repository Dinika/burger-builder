import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const Logout = props => {
  useEffect(() => {
    this.props.logoutUser();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
