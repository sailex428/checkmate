package me.sailex.checkmate.matchmaking;

public record MatchResponse(String info, String username) {

    public MatchResponse(String username) {
        this("Looking for match...", username);
    }

}
