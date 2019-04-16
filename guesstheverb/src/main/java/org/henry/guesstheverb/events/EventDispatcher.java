package org.henry.guesstheverb.events;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EventDispatcher {

    private RabbitTemplate rabbitTemplate;

    // The exchange to use to send anything related to GuessTheVerb service
    private String guessTheVerbExchange;

    // The routing key to use to send this particular event
    private String verbTranslatedRoutingKey;

    @Autowired
    EventDispatcher(final RabbitTemplate rabbitTemplate,
                    @Value("${guesstheverb.exchange}") final String guessTheVerbExchange,
                    @Value("${verb.translated.key}") final String verbTranslatedRoutingKey) {
        this.rabbitTemplate = rabbitTemplate;
        this.guessTheVerbExchange = guessTheVerbExchange;
        this.verbTranslatedRoutingKey = verbTranslatedRoutingKey;
    }

    public void send(final VerbTranslatedEvent verbTranslatedEvent) {
        rabbitTemplate.convertAndSend(
                guessTheVerbExchange,
                verbTranslatedRoutingKey,
                verbTranslatedEvent);
    }
}
