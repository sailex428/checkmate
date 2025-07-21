package me.sailex.checkmate.game;

public record GameStateRequest(String gameId, GameState state, String fen, String whitePlayer, String blackPlayer) {}
