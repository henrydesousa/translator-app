package org.henry.gamification.configuration;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.mongeez.Mongeez;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class MongoAppConfig {

    @Value("${mongeez.filePath}")
    private String mongeezFilePath;

    @Value("${spring.data.mongodb.host}")
    private String mongoHost;

    @Value("${spring.data.mongodb.port}")
    private String mongoPort;

    @Value("${spring.data.mongodb.database}")
    private String mongoDatabase;

    @Bean
    public Mongeez mongeez() {
        Mongeez mongeez = new Mongeez();
        mongeez.setFile(new ClassPathResource(mongeezFilePath));
        mongeez.setMongo(new MongoClient(mongoURI()));
        mongeez.setDbName(mongoDatabase);
        mongeez.process();
        return mongeez;
    }
    
    private MongoClientURI mongoURI() {
        String mongoUri = String.format("mongodb://%s:%s/%s", mongoHost, mongoPort, mongoDatabase);
        MongoClientURI mongoClientURI = new MongoClientURI(mongoUri);
        return mongoClientURI;
    }
}
