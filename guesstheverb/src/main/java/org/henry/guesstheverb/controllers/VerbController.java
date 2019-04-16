package org.henry.guesstheverb.controllers;

import org.henry.guesstheverb.domain.Verb;
import org.henry.guesstheverb.services.VerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/verbs")
//TODO: tests pending
public class VerbController {

    private VerbService verbService;

    @Autowired
    public VerbController(VerbService verbService) {
        this.verbService = verbService;
    }

    @GetMapping("/next/{userAlias}")
    Verb getNextVerb(@PathVariable("userAlias") String userAlias) {
        return verbService.getNextVerb(userAlias);
    }
}
