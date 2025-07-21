package me.sailex.checkmate.move;

import com.github.bhlangonijr.chesslib.Side;
import me.sailex.checkmate.game.GameService;
import me.sailex.checkmate.game.GameSession;
import me.sailex.checkmate.game.GameState;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static me.sailex.checkmate.config.APIPaths.MOVE_UPDATE;

public class MoveService {

    private final GameService gameService;
    private final SimpMessagingTemplate template;

    public MoveService(GameService gameService, SimpMessagingTemplate template) {
        this.gameService = gameService;
        this.template = template;
    }

    public void doMove(String gameId, String move, String username) {
        GameSession gameSession = gameService.getActiveGame(gameId);
        String blackPlayer = gameSession.getBlackPlayer().username();
        String whitePlayer = gameSession.getWhitePlayer().username();

        if (blackPlayer.equals(username)) {
            gameSession.doMove(move, Side.BLACK);
        } else if (whitePlayer.equals(username)) {
            gameSession.doMove(move, Side.WHITE);
        } else {
            throw new InvalidMoveException("Unknown player.");
        }

        if (gameSession.isFinished()) {
            GameState currentState = gameSession.getGameState();
            gameService.endGame(gameId, gameSession, currentState);
        }
        sendMoveUpdate(gameSession.getFen(), blackPlayer, whitePlayer);
    }

    public void sendMoveUpdate(String fen, String blackPlayer, String whitePlayer) {
        MoveUpdateResponse request = new MoveUpdateResponse(fen);
        template.convertAndSendToUser(blackPlayer, MOVE_UPDATE, request);
        template.convertAndSendToUser(whitePlayer, MOVE_UPDATE, request);
    }

}
