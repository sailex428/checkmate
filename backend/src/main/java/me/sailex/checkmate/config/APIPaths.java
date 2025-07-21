package me.sailex.checkmate.config;

public class APIPaths {

    private APIPaths() {}

    //endpoints on the server
    public static final String SESSION = "/api/session";
    public static final String LOGIN = "/api/login";
    public static final String MATCH_REQUEST = "/match/request";
    public static final String GAME_MOVE = "/game/{gameId}/move";

    //paths where the server sends messages to
    public static final String MATCH_UPDATE =  "/match/update";
    public static final String MATCH_ERRORS = "/match/errors";
    public static final String MOVE_UPDATE = "/move/update";
    public static final String GAME_STATE = "/game/state";
    public static final String GAME_MOVE_ERRORS = "/game/move/errors";

}
