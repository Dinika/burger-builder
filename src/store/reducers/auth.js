import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tokenId: null,
  userId: null,
  loading: false,
  error: null
};

const authStart = state => {
  return {
    ...state,
    loading: true
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    tokenId: action.payload.tokenId,
    userId: action.payload.userId,
    loading: false,
    error: null
  };
};

const authError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.payload.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_ERROR:
      return authError(state, action);
    default:
      return state;
  }
};

export default reducer;
