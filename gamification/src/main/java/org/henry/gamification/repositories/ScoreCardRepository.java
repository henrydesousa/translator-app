package org.henry.gamification.repositories;

import org.henry.gamification.domain.ScoreCard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScoreCardRepository extends MongoRepository<ScoreCard, String>, ScoreCardMongoTemplateRepository {

        List<ScoreCard> findByUserIdOrderByScoreTimestampDesc(final String userId);

}
