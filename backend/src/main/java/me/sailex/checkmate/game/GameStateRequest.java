package me.sailex.checkmate.game;


public record GameStateRequest(
    String gameId,
    GameState state,
    String fen,
    String whitePlayer,
    String blackPlayer,
    Color playersColor
) {
    private static final String EMPTY_PROPERTY = "EMPTY";

    public GameStateRequest() {
        this(EMPTY_PROPERTY, GameState.DEFAULT, EMPTY_PROPERTY, EMPTY_PROPERTY, EMPTY_PROPERTY, Color.W);
    }

    public static GameStateRequest buildWithWhite(
        String gameId,
        GameState state,
        String fen,
        String whitePlayer,
        String blackPlayer
    ) {
        return new GameStateRequest(gameId, state, fen, whitePlayer, blackPlayer, Color.W);
    }

    public static GameStateRequest buildWithBlack(
        String gameId,
        GameState state,
        String fen,
        String whitePlayer,
        String blackPlayer
    ) {
        return new GameStateRequest(gameId, state, fen, whitePlayer, blackPlayer, Color.B);
    }

}
