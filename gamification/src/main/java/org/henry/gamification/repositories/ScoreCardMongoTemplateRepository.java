package org.henry.gamification.repositories;

import org.henry.gamification.domain.LeaderBoardRow;

import java.util.List;

public interface ScoreCardMongoTemplateRepository {

    int getTotalScoreForUser(String userId);
    List<LeaderBoardRow> findFirst10();

}
