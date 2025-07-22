package me.sailex.checkmate.game;

import me.sailex.checkmate.config.APIPaths;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class GameStateController {

    private final GameService gameService;

    public GameStateController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping(APIPaths.GAME_UPDATE)
    @SendToUser(APIPaths.GAME_STATE)
    public GameStateRequest getGameStateUpdate(@DestinationVariable String gameId) {
        GameSession session = gameService.getActiveGame(gameId);
        if (session != null) {
            return new GameStateRequest(gameId, session.getGameState(), session.getFen(),
                    session.getWhitePlayer().username(),
                    session.getBlackPlayer().username());
        }
        return new GameStateRequest();
    }

}
