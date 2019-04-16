package org.henry.gamification.services;

import org.henry.gamification.domain.GameStats;

public interface GameService {

    GameStats newAttemptForUser(String userId, String attemptId, boolean correct);

    GameStats retrieveStatsForUser(String userId);

}
