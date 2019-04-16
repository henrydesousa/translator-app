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
@RequestMapping("/results")
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
    ResponseEntity<List<QuizAnswer>> getStatistics(@RequestParam("alias") String alias) {
        return ResponseEntity.ok(verbService.getStatsForUser(alias));
    }

    @GetMapping("/{answerId}")
    ResponseEntity<QuizAnswer> getResultById(final @PathVariable("answerId") String answerId) {
        return ResponseEntity.ok(verbService.getAnswerById(answerId).get());
    }

}