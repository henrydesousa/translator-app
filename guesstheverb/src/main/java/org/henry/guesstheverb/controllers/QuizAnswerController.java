package org.henry.guesstheverb.controllers;

import org.henry.guesstheverb.domain.QuizAnswer;
import org.henry.guesstheverb.services.VerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/answers")
//TODO: tests pending
public class QuizAnswerController {

    private VerbService verbService;

    @Autowired
    public QuizAnswerController(VerbService verbService) {
        this.verbService = verbService;
    }

    @PostMapping
    ResponseEntity<QuizAnswer> postResult(@RequestBody QuizAnswer quizAnswer) {
        boolean isCorrect = verbService.checkAnswer(quizAnswer);
        QuizAnswer quizAnswerCopy = new QuizAnswer(
                quizAnswer.getUser(),
                quizAnswer.getVerbToBeTranslated(),
                quizAnswer.getAnswer(),
                quizAnswer.getLanguage(),
                isCorrect
        );
        return ResponseEntity.ok(quizAnswerCopy);
    }

    @GetMapping
    ResponseEntity<List<QuizAnswer>> getAnswersByUser(@RequestParam String alias) {
        return ResponseEntity.ok(verbService.getAnswersByUser(alias));
    }

    @GetMapping("/{answerId}")
    ResponseEntity<QuizAnswer> getAnswerById(final @PathVariable String answerId) {
        return ResponseEntity.ok(verbService.getAnswerById(answerId).get());
    }

    @PostMapping("/initialize")
    void startGame(@RequestParam String fromLanguage, @RequestParam String toLanguage, @RequestParam String alias) {
        verbService.initializeQuizAnswers(fromLanguage, toLanguage, alias);
    }

}
