import buildContext from './buildContext';

const initialState = {
  title: '',
  subject: '',
  body: '',
  recipients: '',
};

function surveyReducer(state, action) {
  switch (action.type) {
    case 'SET_SURVEY_DATA':
      return { ...state, ...action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

function setSurveyData(dispatch) {
  return function (data) {
    dispatch({ type: 'SET_SURVEY_DATA', payload: data });
  };
}

function resetData(dispatch) {
  return function () {
    dispatch({ type: 'RESET' });
  };
}

export const { Context, Provider } = buildContext(
  surveyReducer,
  { setSurveyData, resetData },
  initialState
);
