import * as actionTypes from './actionTypes';
import axios from '../../axios-translator';

// Synchronous action creators
export const startGameSuccess = (translateFrom, translateInto) => ({
  type: actionTypes.START_GAME_SUCCESS,
  translateFrom,
  translateInto,
});

export const addUserAnswer = userAnswer => ({
  type: actionTypes.ADD_USER_ANSWER,
  userAnswer,
});

export const fetchLeaderboardSuccess = leaderboard => ({
  type: actionTypes.FETCH_LEADERBOARD_SUCCESS,
  leaderboard,
});

// Asynchronous action creators
export const startGame = (translateFrom, translateInto) => (dispatch) => {
  axios
    .post(
      `/answers/initialize?fromLanguage=${translateFrom}&toLanguage=${translateInto}&alias=john_doe`,
    )
    .then((res) => {
      dispatch(startGameSuccess(translateFrom, translateInto));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchLeaderboard = () => (dispatch) => {
  axios
    .get('/leaders')
    .then((res) => {
      dispatch(fetchLeaderboardSuccess(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
