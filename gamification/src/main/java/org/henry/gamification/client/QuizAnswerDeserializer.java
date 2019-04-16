package org.henry.gamification.client;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.henry.gamification.client.dto.QuizAnswer;

import java.io.IOException;

public class QuizAnswerDeserializer extends JsonDeserializer<QuizAnswer> {

    @Override
    public QuizAnswer deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);
        return new QuizAnswer(
                node.get("user").get("alias").asText(),
                node.get("verbToBeTranslated").get("name").asText(),
                node.get("answer").asText(),
                node.get("language").asText(),
                node.get("correct").asBoolean()
        );
    }

}
