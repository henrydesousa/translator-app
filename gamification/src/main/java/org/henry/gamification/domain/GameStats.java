package org.henry.gamification.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.Collections;
import java.util.List;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class GameStats {

    private final String userId;
    private final int score;
    private final List<Badge> badges;

    public static GameStats emptyStats(final String userId) {
        return new GameStats(userId, 0, Collections.emptyList());
    }

    public List<Badge> getBadges() {
        return Collections.unmodifiableList(badges);
    }
}
