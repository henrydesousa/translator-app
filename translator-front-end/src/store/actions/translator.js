import * as actionTypes from './actionTypes';
import axios from '../../axios-translator';

//Synchronous action creators
export const startGameSuccess = (translateFrom, translateInto) => {
    return {
        type: actionTypes.START_GAME_SUCCESS,
        translateFrom: translateFrom,
        translateInto: translateInto
    }
};

export const addUserAnswer = (userAnswer) => {
    return {
        type: actionTypes.ADD_USER_ANSWER,
        userAnswer: userAnswer
    }
};

//Asynchronous action creators
export const startGame = (translateFrom, translateInto) => {
    return dispatch => {
        axios.post(`/answers/initialize?fromLanguage=${translateFrom}&toLanguage=${translateInto}&alias=john_doe`)
            .then(res => {
                dispatch(startGameSuccess(translateFrom, translateInto));
            })
            .catch(error => {
                console.log(error);
            });
    }
};