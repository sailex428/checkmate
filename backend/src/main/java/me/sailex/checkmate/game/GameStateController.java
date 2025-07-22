package me.sailex.checkmate.game;

import me.sailex.checkmate.config.APIPaths;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class GameStateController {

    private final GameService gameService;

    public GameStateController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping(APIPaths.GAME_UPDATE)
    @SendToUser(APIPaths.GAME_STATE)
    public GameStateRequest getGameStateUpdate(@DestinationVariable String gameId, Principal principal) {
        GameSession session = gameService.getActiveGame(gameId);
        if (session != null) {
            Color color = session.getColorOfPlayerName(principal.getName());
            return new GameStateRequest(gameId, session.getGameState(), session.getFen(),
                    session.getWhitePlayer().username(),
                    session.getBlackPlayer().username(), color);
        }
        return new GameStateRequest();
    }

}
