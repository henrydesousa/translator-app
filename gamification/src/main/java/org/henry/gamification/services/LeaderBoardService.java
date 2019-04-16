package org.henry.gamification.services;

import org.henry.gamification.domain.LeaderBoardRow;

import java.util.List;

public interface LeaderBoardService {

    List<LeaderBoardRow> getCurrentLeaderBoard();

}
