package me.sailex.checkmate.matchmaking;

import me.sailex.checkmate.game.GameService;
import me.sailex.checkmate.session.PlayerSession;
import me.sailex.checkmate.session.SessionManager;
import org.springframework.stereotype.Service;

import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class MatchMakingService {

    private final SessionManager sessionManager;
    private final GameService gameService;
    private final Queue<PlayerSession> requests;

    public MatchMakingService(SessionManager sessionManager, GameService gameService) {
        this.gameService = gameService;
        this.sessionManager = sessionManager;
        this.requests = new LinkedBlockingQueue<>();
    }

    public void addToMatchMaking(String playerName) {
        PlayerSession player1 = sessionManager.getSession(playerName);
        if (requests.contains(player1) || player1 == null) {
            return;
        }
        if (requests.isEmpty()) {
            requests.offer(player1);
        } else {
            PlayerSession player2 = requests.poll();
            gameService.startGame(player1, player2);
        }
    }
}
