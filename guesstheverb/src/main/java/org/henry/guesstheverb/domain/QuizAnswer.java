package org.henry.guesstheverb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Document(collection = "quizzes_answers")
public final class QuizAnswer {

    @JsonIgnore
    private String id;
    private final User user;
    private final Verb verbToBeTranslated;
    private final String answer;
    private final String language;
    private final boolean correct;

}
