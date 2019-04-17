package org.henry.guesstheverb.services;

import org.henry.guesstheverb.domain.QuizAnswer;
import org.henry.guesstheverb.domain.User;
import org.henry.guesstheverb.domain.Verb;
import org.henry.guesstheverb.events.EventDispatcher;
import org.henry.guesstheverb.events.VerbTranslatedEvent;
import org.henry.guesstheverb.repositories.QuizAnswerRepository;
import org.henry.guesstheverb.repositories.VerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VerbServiceImpl implements VerbService {

    private VerbRepository verbRepository;
    private QuizAnswerRepository quizAnswerRepository;
    private EventDispatcher eventDispatcher;

    @Autowired
    public VerbServiceImpl(VerbRepository verbRepository,
                           QuizAnswerRepository quizAnswerRepository,
                           EventDispatcher eventDispatcher) {
        this.verbRepository = verbRepository;
        this.quizAnswerRepository = quizAnswerRepository;
        this.eventDispatcher = eventDispatcher;
    }

    @Override
    public Verb getNextVerb(String userAlias) {
        Optional<QuizAnswer> quizAnswer = quizAnswerRepository.findFirstByUserAndAnswer(new User(userAlias), "");
        return quizAnswer.map(QuizAnswer::getVerbToBeTranslated).orElse(null);
    }

    //TODO: @Transactional
    @Override
    public boolean checkAnswer(QuizAnswer quizAnswer) {
        Optional<Verb> verb = verbRepository.findByGroupIdAndLanguage(quizAnswer.getVerbToBeTranslated().getGroupId(), quizAnswer.getLanguage());
        boolean isCorrect = verb.map(v -> quizAnswer.getAnswer().equals(v.getName())).orElse(false);

        //TODO: to be refactored after reading the book and having the UI in react
        Optional<QuizAnswer> quizAnswerOptional = quizAnswerRepository.findByUserAndVerbToBeTranslatedAndLanguage(quizAnswer.getUser(),
                                                                                                                  quizAnswer.getVerbToBeTranslated(),
                                                                                                                  quizAnswer.getLanguage());
        if (quizAnswerOptional.isPresent()) {
            QuizAnswer quizAnswerFromDB = quizAnswerOptional.get();
            QuizAnswer quizAnswerToSave = new QuizAnswer(
                    quizAnswerFromDB.getId(),
                    quizAnswerFromDB.getUser(),
                    quizAnswerFromDB.getVerbToBeTranslated(),
                    quizAnswer.getAnswer(),
                    quizAnswerFromDB.getLanguage(),
                    isCorrect
            );
            quizAnswerRepository.save(quizAnswerToSave);

            eventDispatcher.send(
                    new VerbTranslatedEvent(
                            quizAnswerToSave.getId(),
                            quizAnswerToSave.getUser().getAlias(),
                            quizAnswerToSave.isCorrect()
                    )
            );
        }
        return isCorrect;
    }

    //TODO: add getResultById as in the book
    @Override
    public List<QuizAnswer> getStatsForUser(final String userAlias) {
        return quizAnswerRepository.findTop5ByUserAliasOrderByIdDesc(userAlias);
    }

    @Override
    public Optional<QuizAnswer> getAnswerById(String answerId) {
        return quizAnswerRepository.findById(answerId);
    }

    @Override
    public void initializeQuizAnswers(String fromLanguage, String toLanguage, String userAlias) {
        List<Verb> verbs = verbRepository.findByLanguage(fromLanguage);
        List<QuizAnswer> quizAnswers = new ArrayList<>();
        User user = new User(userAlias);
        QuizAnswer quizAnswer;

        for (Verb verb : verbs) {
            quizAnswer = new QuizAnswer(
                    user,
                    verb,
                    "",
                    toLanguage,
                    false
            );
            quizAnswers.add(quizAnswer);
        }
        quizAnswerRepository.saveAll(quizAnswers);
    }
}
