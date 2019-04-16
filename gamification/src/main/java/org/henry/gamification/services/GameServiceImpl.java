package org.henry.gamification.services;

import lombok.extern.slf4j.Slf4j;
import org.henry.gamification.client.QuizAnswerClient;
import org.henry.gamification.client.dto.QuizAnswer;
import org.henry.gamification.domain.Badge;
import org.henry.gamification.domain.BadgeCard;
import org.henry.gamification.domain.GameStats;
import org.henry.gamification.domain.ScoreCard;
import org.henry.gamification.repositories.BadgeCardRepository;
import org.henry.gamification.repositories.ScoreCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
class GameServiceImpl implements GameService {

    private static final String LUCKY_LANGUAGE = "de";

    private ScoreCardRepository scoreCardRepository;
    private BadgeCardRepository badgeCardRepository;
    private QuizAnswerClient quizAnswerClient;

    @Autowired
    GameServiceImpl(ScoreCardRepository scoreCardRepository,
                    BadgeCardRepository badgeCardRepository,
                    QuizAnswerClient quizAnswerClient) {
        this.scoreCardRepository = scoreCardRepository;
        this.badgeCardRepository = badgeCardRepository;
        this.quizAnswerClient = quizAnswerClient;
    }

    @Override
    public GameStats newAttemptForUser(final String userId,
                                       final String attemptId,
                                       final boolean correct) {
        // For the first version we'll give points only if it's correct
        if(correct) {
            ScoreCard scoreCard = new ScoreCard(userId, attemptId);
            scoreCardRepository.save(scoreCard);
            log.info("User with id {} scored {} points for attempt id {}",
                    userId, scoreCard.getScore(), attemptId);
            List<BadgeCard> badgeCards = processForBadges(userId, attemptId);
            return new GameStats(userId, scoreCard.getScore(),
                    badgeCards.stream().map(BadgeCard::getBadge)
                            .collect(Collectors.toList()));
        }
        return GameStats.emptyStats(userId);
    }

    /**
     * Checks the total score and the different score cards obtained
     * to give new badges in case their conditions are met.
     */
    private List<BadgeCard> processForBadges(final String userId,
                                             final String attemptId) {
        List<BadgeCard> badgeCards = new ArrayList<>();

        int totalScore = scoreCardRepository.getTotalScoreForUser(userId);
        log.info("New score for user {} is {}", userId, totalScore);

        List<ScoreCard> scoreCardList = scoreCardRepository.findByUserIdOrderByScoreTimestampDesc(userId);
        List<BadgeCard> badgeCardList = badgeCardRepository.findByUserIdOrderByBadgeTimestampDesc(userId);

        // Badges depending on score
        checkAndGiveBadgeBasedOnScore(badgeCardList,
                Badge.BRONZE_TRANSLATOR, totalScore, 100, userId)
                .ifPresent(badgeCards::add);
        checkAndGiveBadgeBasedOnScore(badgeCardList,
                Badge.SILVER_TRANSLATOR, totalScore, 500, userId)
                .ifPresent(badgeCards::add);
        checkAndGiveBadgeBasedOnScore(badgeCardList,
                Badge.GOLD_TRANSLATOR, totalScore, 999, userId)
                .ifPresent(badgeCards::add);

        // First won badge
        if(scoreCardList.size() == 1 &&
                !containsBadge(badgeCardList, Badge.FIRST_WON)) {
            BadgeCard firstWonBadge = giveBadgeToUser(Badge.FIRST_WON, userId);
            badgeCards.add(firstWonBadge);
        }

        // Translating to German badge
        QuizAnswer answer = quizAnswerClient.retrieveQuizAnswerById(attemptId);
        if (!containsBadge(badgeCardList, Badge.GERMAN_TRANSLATOR) && LUCKY_LANGUAGE.equals(answer.getLanguage())) {
            BadgeCard luckyLanguageBadge = giveBadgeToUser(Badge.GERMAN_TRANSLATOR, userId);
            badgeCards.add(luckyLanguageBadge);
        }

        return badgeCards;
    }

    @Override
    public GameStats retrieveStatsForUser(final String userId) {
        int score = scoreCardRepository.getTotalScoreForUser(userId);
        List<BadgeCard> badgeCards = badgeCardRepository
                .findByUserIdOrderByBadgeTimestampDesc(userId);
        return new GameStats(userId, score, badgeCards.stream()
                .map(BadgeCard::getBadge).collect(Collectors.toList()));
    }

    /**
     * Convenience method to check the current score against
     * the different thresholds to gain badges.
     * It also assigns badge to user if the conditions are met.
     */
    private Optional<BadgeCard> checkAndGiveBadgeBasedOnScore(
            final List<BadgeCard> badgeCards, final Badge badge,
            final int score, final int scoreThreshold, final String userId) {
        if(score >= scoreThreshold && !containsBadge(badgeCards, badge)) {
            return Optional.of(giveBadgeToUser(badge, userId));
        }
        return Optional.empty();
    }

    /**
     * Checks if the passed list of badges includes the one being checked
     */
    private boolean containsBadge(final List<BadgeCard> badgeCards, final Badge badge) {
        return badgeCards.stream().anyMatch(b -> b.getBadge().equals(badge));
    }

    /**
     * Assigns a new badge to the given user
     */
    private BadgeCard giveBadgeToUser(final Badge badge, final String userId) {
        BadgeCard badgeCard = new BadgeCard(userId, badge);
        badgeCardRepository.save(badgeCard);
        log.info("User with id {} won a new badge: {}", userId, badge);
        return badgeCard;
    }

}
