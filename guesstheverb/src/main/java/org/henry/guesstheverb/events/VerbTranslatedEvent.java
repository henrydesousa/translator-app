package org.henry.guesstheverb.events;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class VerbTranslatedEvent {

    private final String quizAnswerId;
    private final String userAlias;
    private final boolean correct;

}
