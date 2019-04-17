package org.henry.gamification.client;

import org.henry.gamification.client.dto.QuizAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
class QuizAnswerClientImpl implements QuizAnswerClient {

    private final RestTemplate restTemplate;
    private final String guessTheVerbHost;

    @Autowired
    public QuizAnswerClientImpl(final RestTemplate restTemplate,
                                @Value("${guesstheverb.host}") final String multiplicationHost) {
        this.restTemplate = restTemplate;
        this.guessTheVerbHost = multiplicationHost;
    }

    @Override
    public QuizAnswer retrieveQuizAnswerById(final String quizAnswerId) {
        return restTemplate.getForObject(guessTheVerbHost + "/answers/" + quizAnswerId, QuizAnswer.class);
    }
}
