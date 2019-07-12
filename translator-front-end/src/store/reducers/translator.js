import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';
import englandFlag from '../../assets/images/england.png';
import germanyFlag from '../../assets/images/germany.png';
import spanishFlag from '../../assets/images/spain.png';

const initialState = {
  redirectToTranslator: false,
  translateFrom: 'default',
  translateInto: 'default',
  userAnswers: [],
  languages: [
    { code: 'en', name: 'English', icon: englandFlag },
    { code: 'de', name: 'German', icon: germanyFlag },
    { code: 'es', name: 'Spanish', icon: spanishFlag },
  ],
  leaderboard: [],
};

const startGameSuccess = (state, action) =>
  updateObject(state, {
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

const fetchLeaderboardSuccess = (state, action) =>
  updateObject(state, {
    leaderboard: action.leaderboard,
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GAME_SUCCESS:
      return startGameSuccess(state, action);
    case actionTypes.ADD_USER_ANSWER:
      return addUserAnswer(state, action);
    case actionTypes.FETCH_LEADERBOARD_SUCCESS:
      return fetchLeaderboardSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
