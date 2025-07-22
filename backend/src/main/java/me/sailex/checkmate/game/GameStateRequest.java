package me.sailex.checkmate.game;


public record GameStateRequest(
    String gameId,
    GameState state,
    String fen,
    String whitePlayer,
    String blackPlayer
) {
    private static final String EMPTY_PROPERTY = "EMPTY";

    public GameStateRequest() {
        this(EMPTY_PROPERTY, GameState.DEFAULT, EMPTY_PROPERTY, EMPTY_PROPERTY, EMPTY_PROPERTY);
    }
}
