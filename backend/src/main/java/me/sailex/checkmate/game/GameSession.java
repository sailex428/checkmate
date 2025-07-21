package me.sailex.checkmate.game;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Side;
import com.github.bhlangonijr.chesslib.move.Move;
import lombok.Getter;
import me.sailex.checkmate.move.InvalidMoveException;
import me.sailex.checkmate.session.PlayerSession;

public class GameSession {

    private static final boolean FULL_VALIDATION = true;

    @Getter
    private final PlayerSession whitePlayer;
    @Getter
    private final PlayerSession blackPlayer;
    private final Board board;

    public GameSession(PlayerSession player1, PlayerSession player2) {
        if (Math.random() > 0.5) {
            this.whitePlayer =  player1;
            this.blackPlayer = player2;
        } else {
            this.whitePlayer = player2;
            this.blackPlayer = player1;
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

}
