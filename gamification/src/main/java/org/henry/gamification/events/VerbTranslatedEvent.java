package org.henry.gamification.events;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class VerbTranslatedEvent {

    private final String quizAnswerId;
    private final String userAlias;
    private final boolean correct;

}
