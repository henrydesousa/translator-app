package org.henry.guesstheverb.services;

import org.henry.guesstheverb.domain.QuizAnswer;
import org.henry.guesstheverb.domain.Verb;

import java.util.List;
import java.util.Optional;

public interface VerbService {

    Verb getNextVerb(String userAlias);

    boolean checkAnswer(final QuizAnswer quizAnswer);

    List<QuizAnswer> getAnswersByUser(final String userAlias);

    Optional<QuizAnswer> getAnswerById(String answerId);

    void initializeQuizAnswers(String fromLanguage, String toLanguage, String userAlias);

}
