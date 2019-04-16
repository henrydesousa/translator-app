package org.henry.gamification.client;


import org.henry.gamification.client.dto.QuizAnswer;

public interface QuizAnswerClient {

    QuizAnswer retrieveQuizAnswerById(final String quizAnswerId);

}
