package org.henry.gamification.events;

import lombok.extern.slf4j.Slf4j;
import org.henry.gamification.services.GameService;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
class EventHandler {

    private GameService gameService;

    EventHandler(final GameService gameService) {
        this.gameService = gameService;
    }

    @RabbitListener(queues = "${guesstheverb.queue}")
    void handleVerbTranslated(final VerbTranslatedEvent event) {
        log.info("Verb Translated Event received: {}", event.getQuizAnswerId());
        try {
            gameService.newAttemptForUser(event.getUserAlias(), event.getQuizAnswerId(), event.isCorrect());
        } catch (final Exception e) {
            log.error("Error when trying to process VerbTranslatedEvent", e);
            // Avoids the event to be re-queued and reprocessed.
            throw new AmqpRejectAndDontRequeueException(e);
        }
    }
}
