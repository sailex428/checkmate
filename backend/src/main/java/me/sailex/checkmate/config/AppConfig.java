package me.sailex.checkmate.config;

import me.sailex.checkmate.health.HealthController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public CheckmateProperties properties() {
        return new CheckmateProperties();
    }

    @Bean
    public HealthController healthController(CheckmateProperties properties) {
        return new HealthController(properties);
    }

}
