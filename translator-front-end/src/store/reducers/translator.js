import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  redirectToTranslator: false,
  translateFrom: 'default',
  translateInto: 'default',
  userAnswers: [],
};

const startGameSuccess = (state, action) => updateObject(state, {
    redirectToTranslator: true,
    translateFrom: action.translateFrom,
    translateInto: action.translateInto,
  });

const addUserAnswer = (state, action) => {
  const newAnswerObj = {
    verb: action.userAnswer.verbToBeTranslated.name,
    answer: action.userAnswer.answer,
    correct: action.userAnswer.correct ? 'Yes' : 'No',
  };
  return updateObject(state, {
    userAnswers: [newAnswerObj, ...state.userAnswers],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GAME_SUCCESS:
      return startGameSuccess(state, action);
    case actionTypes.ADD_USER_ANSWER:
      return addUserAnswer(state, action);
    default:
      return state;
  }
};

export default reducer;
