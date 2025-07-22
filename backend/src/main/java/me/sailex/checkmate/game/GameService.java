package me.sailex.checkmate.game;

import me.sailex.checkmate.session.PlayerSession;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import static me.sailex.checkmate.config.APIPaths.GAME_STATE;

@Service
public class GameService {

    private final SimpMessagingTemplate template;
    private final Map<String, GameSession> activeGames;

    public GameService(SimpMessagingTemplate template) {
        this.template = template;
        this.activeGames = new HashMap<>();
    }

    public void startGame(PlayerSession player1, PlayerSession player2) {
        GameSession gameSession = new GameSession(player1, player2);
        String whitePlayerName = gameSession.getWhitePlayer().username();
        String blackPlayerName = gameSession.getBlackPlayer().username();
        String gameId = generateGameId(whitePlayerName, blackPlayerName);

        template.convertAndSendToUser(whitePlayerName, GAME_STATE,
                GameStateRequest.buildWithWhite(gameId, GameState.START, gameSession.getFen(), whitePlayerName, blackPlayerName));

        template.convertAndSendToUser(blackPlayerName, GAME_STATE, GameStateRequest.buildWithBlack(gameId, GameState.START,
                gameSession.getFen(), whitePlayerName, blackPlayerName));

        activeGames.put(gameId, gameSession);
    }

    public void endGame(String gameId, GameSession session, GameState state) {
        String whitePlayerName = session.getWhitePlayer().username();
        String blackPlayerName = session.getBlackPlayer().username();

        template.convertAndSendToUser(whitePlayerName, GAME_STATE,
                GameStateRequest.buildWithWhite(gameId, state, session.getFen(), whitePlayerName, blackPlayerName));

        template.convertAndSendToUser(blackPlayerName, GAME_STATE,
                GameStateRequest.buildWithBlack(gameId, state, session.getFen(), whitePlayerName, blackPlayerName));

        activeGames.remove(gameId);
    }

    private String generateGameId(String username1, String username2) {
        return System.currentTimeMillis() + "-" + username1 + "-" + username2;
    }

    public GameSession getActiveGame(String gameId) {
        return activeGames.get(gameId);
    }
}
