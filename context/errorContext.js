import buildContext from './buildContext';

const initialState = {
  showErrorBanner: false,
  errorBannerText: '',
};

function errorReducer(state, action) {
  switch (action.type) {
    case 'SET_SHOW_BANNER':
      return {
        ...state,
        showErrorBanner: action.payload.show,
        errorBannerText: action.payload.text || '',
      };

    default:
      return state;
  }
}

function setShowBanner(dispatch) {
  return function (show, text) {
    dispatch({ type: 'SET_SHOW_BANNER', payload: { show, text } });
  };
}

export const { Context, Provider } = buildContext(
  errorReducer,
  { setShowBanner },
  initialState
);
