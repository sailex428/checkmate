package me.sailex.checkmate.matchmaking;

import me.sailex.checkmate.game.GameService;
import me.sailex.checkmate.session.PlayerSession;
import me.sailex.checkmate.session.SessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class MatchMakingService {

    private static final Logger logger = LoggerFactory.getLogger(MatchMakingService.class);

    private final SessionManager sessionManager;
    private final GameService gameService;
    private final Queue<PlayerSession> requests;

    public MatchMakingService(SessionManager sessionManager, GameService gameService) {
        this.gameService = gameService;
        this.sessionManager = sessionManager;
        this.requests = new LinkedBlockingQueue<>();
    }

    public boolean addToMatchMaking(String playerName) {
        PlayerSession player1 = sessionManager.getSession(playerName);
        if (requests.contains(player1)) {
            return true;
        }

        if (requests.isEmpty()) {
            requests.offer(player1);
            logger.info("Player {} has been added to match making", player1.username());
            return true;
        } else {
            PlayerSession player2 = requests.poll();
            logger.info("Start Game with {} and {}",  player1.username(), player2.username());
            gameService.startGame(player1, player2);
            return false;
        }
    }
}
