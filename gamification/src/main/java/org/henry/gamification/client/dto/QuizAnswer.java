package org.henry.gamification.client.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.henry.gamification.client.QuizAnswerDeserializer;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@JsonDeserialize(using = QuizAnswerDeserializer.class)
public class QuizAnswer {

    private final String userAlias;
    private final String verbToBeTranslated;
    private final String answer;
    private final String language;
    private final boolean correct;

}
