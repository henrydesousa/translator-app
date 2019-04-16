package org.henry.gamification.repositories;

import org.henry.gamification.domain.BadgeCard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BadgeCardRepository extends MongoRepository<BadgeCard, String> {

    List<BadgeCard> findByUserIdOrderByBadgeTimestampDesc(final String userId);

}
