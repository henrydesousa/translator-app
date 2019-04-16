package org.henry.guesstheverb.services;

import org.henry.guesstheverb.domain.QuizAnswer;
import org.henry.guesstheverb.domain.User;
import org.henry.guesstheverb.domain.Verb;
import org.henry.guesstheverb.events.EventDispatcher;
import org.henry.guesstheverb.events.VerbTranslatedEvent;
import org.henry.guesstheverb.repositories.QuizAnswerRepository;
import org.henry.guesstheverb.repositories.VerbRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class VerbServiceImplTest {

    private VerbServiceImpl verbServiceImpl;

    @Mock
    private VerbRepository verbRepository;

    @Mock
    private QuizAnswerRepository quizAnswerRepository;

    @Mock
    private EventDispatcher eventDispatcher;

    @Before
    public void setUp() {
        // With this call to initMocks we tell Mockito to process the annotations
        MockitoAnnotations.initMocks(this);
        verbServiceImpl = new VerbServiceImpl(verbRepository, quizAnswerRepository, eventDispatcher);
    }

    @Test
    public void testGetNextVerb_Valid() {
        // Setup
        User user = new User("john_doe");
        Verb verb = new Verb("to buy", "en", "001");
        QuizAnswer quizAnswer = new QuizAnswer(user, verb, "", "001", false);
        when(quizAnswerRepository.findFirstByUserAndAnswer(any(User.class), any(String.class))).thenReturn(Optional.of(quizAnswer));

        // Invocation
        Verb result = verbServiceImpl.getNextVerb("john_doe");

        // Assertions
        assertThat(result.getName()).isEqualTo("to buy");
        assertThat(result.getLanguage()).isEqualTo("en");
        assertThat(result.getGroupId()).isEqualTo("001");
    }

    @Test
    public void testGetNextVerb_VerbIsNotFound() {
        // Setup
        when(quizAnswerRepository.findFirstByUserAndAnswer(any(User.class), any(String.class))).thenReturn(Optional.empty());

        // Invocation
        Verb result = verbServiceImpl.getNextVerb("john_doe");

        // Assertions
        assertNull(result);
    }

    @Test
    public void testCheckAnswer_AnswerIsCorrect() {
        // Setup
        User user = new User("john_doe");
        Verb verbToBeTranslated = new Verb("to buy", "en", "001");
        Verb verbFromDB = new Verb("kaufen", "de", "001");
        QuizAnswer quizAnswerAttempt = new QuizAnswer(user, verbToBeTranslated, "kaufen", "de", false);
        QuizAnswer quizAnswerVerifiedAttempt = new QuizAnswer(user, verbToBeTranslated, "kaufen", "de", true);
        QuizAnswer quizAnswerFromDB = new QuizAnswer(quizAnswerAttempt.getUser(), quizAnswerAttempt.getVerbToBeTranslated(), "", quizAnswerAttempt.getLanguage(), false);
        VerbTranslatedEvent verbTranslatedEvent = new VerbTranslatedEvent(quizAnswerVerifiedAttempt.getId(), quizAnswerVerifiedAttempt.getUser().getId(), quizAnswerVerifiedAttempt.isCorrect());
        when(verbRepository.findByGroupIdAndLanguage(any(String.class), any(String.class))).thenReturn(Optional.of(verbFromDB));
        when(quizAnswerRepository.findByUserAndVerbToBeTranslatedAndLanguage(any(User.class), any(Verb.class), any(String.class))).thenReturn(Optional.of(quizAnswerFromDB));

        // Invocation
        boolean result = verbServiceImpl.checkAnswer(quizAnswerAttempt);

        // Assertions
        assertTrue(result);
        verify(quizAnswerRepository, times(1)).save(quizAnswerVerifiedAttempt);
        verify(eventDispatcher, times(1)).send(verbTranslatedEvent);
    }

    @Test
    public void testCheckAnswer_AnswerIsNotCorrect() {
        // Setup
        User user = new User("john_doe");
        Verb verbToBeTranslated = new Verb("to buy", "en", "001");
        Verb verbFromDB = new Verb("kaufen", "de", "001");
        QuizAnswer quizAnswerAttempt = new QuizAnswer(user, verbToBeTranslated, "lernen", "de", false);
        QuizAnswer quizAnswerVerifiedAttempt = new QuizAnswer(user, verbToBeTranslated, "lernen", "de", false);
        QuizAnswer quizAnswerFromDB = new QuizAnswer(quizAnswerAttempt.getUser(), quizAnswerAttempt.getVerbToBeTranslated(), "", quizAnswerAttempt.getLanguage(), false);
        VerbTranslatedEvent verbTranslatedEvent = new VerbTranslatedEvent(quizAnswerVerifiedAttempt.getId(), quizAnswerVerifiedAttempt.getUser().getId(), quizAnswerVerifiedAttempt.isCorrect());
        when(verbRepository.findByGroupIdAndLanguage(any(String.class), any(String.class))).thenReturn(Optional.of(verbFromDB));
        when(quizAnswerRepository.findByUserAndVerbToBeTranslatedAndLanguage(any(User.class), any(Verb.class), any(String.class))).thenReturn(Optional.of(quizAnswerFromDB));

        // Invocation
        boolean result = verbServiceImpl.checkAnswer(quizAnswerAttempt);

        // Assertions
        assertFalse(result);
        verify(quizAnswerRepository, times(1)).save(quizAnswerVerifiedAttempt);
        verify(eventDispatcher, times(1)).send(verbTranslatedEvent);
    }

    @Test
    public void testCheckAnswer_VerbIsNotFound() {
        User user = new User("john_doe");
        Verb verbToBeTranslated = new Verb("to buy", "en", "001");
        QuizAnswer quizAnswerAttempt = new QuizAnswer(user, verbToBeTranslated, "lernen", "de", false);
        // Setup
        when(verbRepository.findByGroupIdAndLanguage(any(String.class), any(String.class))).thenReturn(Optional.empty());
        when(quizAnswerRepository.findByUserAndVerbToBeTranslatedAndLanguage(any(User.class), any(Verb.class), any(String.class))).thenReturn(Optional.empty());

        // Invocation
        boolean result = verbServiceImpl.checkAnswer(quizAnswerAttempt);

        // Assertions
        assertFalse(result);
        verify(quizAnswerRepository, times(0)).save(any());
        verify(eventDispatcher, times(0)).send(any());
    }

}
