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
@Document(collection = "score_cards")
public class ScoreCard {

        public static final int DEFAULT_SCORE = 10;

        private final String userId;
        private final String attemptId;
        private final long scoreTimestamp;
        private final int score;

        public ScoreCard(final String userId, final String attemptId) {
                this(userId, attemptId, System.currentTimeMillis(), DEFAULT_SCORE);
        }

}
