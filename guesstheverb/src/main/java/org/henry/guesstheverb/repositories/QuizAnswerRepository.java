package org.henry.guesstheverb.repositories;

import org.henry.guesstheverb.domain.QuizAnswer;
import org.henry.guesstheverb.domain.User;
import org.henry.guesstheverb.domain.Verb;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface QuizAnswerRepository extends MongoRepository<QuizAnswer, String> {

    Optional<QuizAnswer> findFirstByUserAndAnswer(User user, String answer);

    Optional<QuizAnswer> findByUserAndVerbToBeTranslatedAndLanguage(User user, Verb verbToBeTranslated, String language);

    List<QuizAnswer> findTop5ByUserAliasOrderByIdDesc(String userAlias);

}
