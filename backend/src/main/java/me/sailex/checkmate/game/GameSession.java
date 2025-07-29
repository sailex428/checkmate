package me.sailex.checkmate.game;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Side;
import com.github.bhlangonijr.chesslib.move.Move;
import me.sailex.checkmate.move.InvalidMoveException;
import me.sailex.checkmate.session.PlayerSession;

import java.util.HashMap;
import java.util.Map;

public class GameSession {

    private static final boolean FULL_VALIDATION = true;

    private final Map<Color, PlayerSession> colorToPlayer;
    private final Board board;

    public GameSession(PlayerSession player1, PlayerSession player2) {
        this.colorToPlayer = new HashMap<>(); //TODO: use a enum map here
        if (Math.random() > 0.5) {
            this.colorToPlayer.put(Color.W, player1);
            this.colorToPlayer.put(Color.B, player2);
        } else {
            this.colorToPlayer.put(Color.W, player2);
            this.colorToPlayer.put(Color.B, player1);
        }
        this.board = new Board();
    }

    public void doMove(String move, Side side) {
        boolean isMoveValid = this.board.doMove(new Move(move, side), FULL_VALIDATION);
        if (!isMoveValid) {
            throw new InvalidMoveException("Move '" + move + "' is invalid");
        }
    }

    public boolean isFinished() {
        return this.board.isDraw() || this.board.isMated();
    }

    public GameState getGameState() {
        if (this.board.isMated()) {
            return this.board.getSideToMove() == Side.BLACK ?
                    GameState.WHITE_WON : GameState.BLACK_WON;
        } else if (this.board.isDraw()) {
            return GameState.DRAW;
        } else {
            return GameState.ONGOING;
        }
    }

    public String getFen() {
        return this.board.getFen();
    }

    public PlayerSession getWhitePlayer() {
        return colorToPlayer.get(Color.W);
    }

    public PlayerSession getBlackPlayer() {
        return colorToPlayer.get(Color.B);
    }

    public Color getColorOfPlayer(PlayerSession player) {
        return colorToPlayer.entrySet().stream()
                .filter(e -> e.getValue() == player)
                .findFirst()
                .orElseThrow()
                .getKey();
    }

    public Color getColorOfPlayerName(String playerName) {
        return colorToPlayer.entrySet().stream()
                .filter(e -> e.getValue().username().equals(playerName))
                .findFirst()
                .orElseThrow()
                .getKey();
    }

}
