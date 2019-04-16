package org.henry.gamification.repositories;

import org.henry.gamification.domain.LeaderBoardRow;
import org.henry.gamification.domain.ScoreCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

import static org.springframework.data.domain.Sort.Direction;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

public class ScoreCardMongoTemplateRepositoryImpl implements ScoreCardMongoTemplateRepository {

    private static final String USER_ID = "userId";
    private static final String SCORE = "score";
    private static final String TOTAL_SCORE = "totalScore";

    @Autowired
    private MongoTemplate mongoTemplate;

    public int getTotalScoreForUser(String userId) {
        GroupOperation groupByUserIdAndSumScore = group(USER_ID).sum(SCORE).as(TOTAL_SCORE);
        MatchOperation matchByUserId = match(new Criteria(USER_ID).is(userId));
        SortOperation sortByTotalScoreDesc = sort(new Sort(Direction.DESC, TOTAL_SCORE));
        Aggregation aggregation = newAggregation(matchByUserId, groupByUserIdAndSumScore, sortByTotalScoreDesc);
        AggregationResults<LeaderBoardRow> result = mongoTemplate.aggregate(aggregation, ScoreCard.class, LeaderBoardRow.class);
        if (result != null && !result.getMappedResults().isEmpty()) {
            return result.getMappedResults().get(0).getTotalScore().intValue();
        }
        return 0;
    }

    public List<LeaderBoardRow> findFirst10() {
        GroupOperation groupByUserIdAndSumScore = group(USER_ID).sum(SCORE).as(TOTAL_SCORE);
        SortOperation sortByTotalScoreDesc = sort(new Sort(Direction.DESC, TOTAL_SCORE));
        Aggregation aggregation = newAggregation(groupByUserIdAndSumScore, sortByTotalScoreDesc);
        AggregationResults<LeaderBoardRow> result = mongoTemplate.aggregate(aggregation, ScoreCard.class, LeaderBoardRow.class);
        return result.getMappedResults();
    }

}
