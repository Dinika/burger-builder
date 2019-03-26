import reducer from '../auth';
import * as actionTypes from '../../actions/actionTypes';

describe('Auth Reducer', () => {
  const initialState = {
    tokenId: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
  };

  it('should return initialState for invalid action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should set loading to true on authStart', () => {
    const action = {
      type: actionTypes.AUTH_START
    };
    const expectedState = {
      tokenId: null,
      userId: null,
      loading: true,
      error: null,
      authRedirectPath: '/'
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should set userId & tokenId on successful login', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        userId: 'some-id',
        tokenId: 'some-token'
      }
    };
    const expectedState = {
      tokenId: 'some-token',
      userId: 'some-id',
      loading: false,
      error: null,
      authRedirectPath: '/'
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
