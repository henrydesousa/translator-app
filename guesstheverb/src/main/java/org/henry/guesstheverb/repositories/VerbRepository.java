package org.henry.guesstheverb.repositories;

import org.henry.guesstheverb.domain.Verb;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VerbRepository extends MongoRepository<Verb, String> {

    Optional<Verb> findByGroupIdAndLanguage(String groupId, String language);
    List<Verb> findByLanguage(String language);

}
