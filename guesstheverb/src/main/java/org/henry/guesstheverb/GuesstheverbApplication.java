package org.henry.guesstheverb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class GuesstheverbApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuesstheverbApplication.class, args);
	}

}
