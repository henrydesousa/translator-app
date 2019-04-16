package org.henry.gamification.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Document(collection = "badge_cards")
public class BadgeCard {

    private final String userId;
    private final long badgeTimestamp;
    private final Badge badge;

    public BadgeCard(final String userId, final Badge badge) {
        this(userId, System.currentTimeMillis(), badge);
    }

}
