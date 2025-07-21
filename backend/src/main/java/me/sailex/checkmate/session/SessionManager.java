package me.sailex.checkmate.session;

public interface SessionManager {

    PlayerSession getSession(String name);
    PlayerSession getSessionByToken(String token);
    PlayerSession createSession(String name);

}
