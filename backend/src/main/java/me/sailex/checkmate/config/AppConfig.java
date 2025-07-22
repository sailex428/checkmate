package me.sailex.checkmate.config;

import me.sailex.checkmate.exception.ErrorControllerAdvice;
import me.sailex.checkmate.game.GameService;
import me.sailex.checkmate.matchmaking.MatchMakingController;
import me.sailex.checkmate.matchmaking.MatchMakingService;
import me.sailex.checkmate.move.MoveController;
import me.sailex.checkmate.move.MoveService;
import me.sailex.checkmate.session.SessionManager;
import me.sailex.checkmate.session.PlayerSessionManager;
import me.sailex.checkmate.session.UserSessionRestController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Configuration
public class AppConfig {

    @Bean
    CheckmateProperties properties() {
        return new CheckmateProperties();
    }

    @Bean
    UserSessionRestController userSessionRestController(SessionManager userSessionManager, CheckmateProperties properties) {
        return new UserSessionRestController(userSessionManager, properties);
    }

    @Bean
    MatchMakingService matchMakingService(SessionManager sessionManager, GameService gameService) {
        return new MatchMakingService(sessionManager, gameService);
    }

    @Bean
    MatchMakingController matchMakingController(MatchMakingService matchMakingService, SimpMessagingTemplate template) {
        return new MatchMakingController(matchMakingService, template);
    }

    @Bean
    SessionManager sessionManager(CheckmateProperties properties) {
        return new PlayerSessionManager(properties);
    }

    @Bean
    GameService gameService(SimpMessagingTemplate template) {
        return new GameService(template);
    }

    @Bean
    MoveService moveService(GameService gameService, SimpMessagingTemplate template) {
        return new MoveService(gameService, template);
    }

    @Bean
    MoveController moveController(MoveService moveService) {
        return new MoveController(moveService);
    }

    @Bean
    ErrorControllerAdvice errorControllerAdvice() {
        return new ErrorControllerAdvice();
    }

}
