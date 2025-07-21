package me.sailex.checkmate.session;

import me.sailex.checkmate.config.CheckmateProperties;
import me.sailex.checkmate.session.exception.InvalidSessionException;
import me.sailex.checkmate.session.exception.InvalidUsernameException;

import java.util.Optional;

public class PlayerSessionManager implements SessionManager {

    private final ExpirableList<PlayerSession> playerSessions;

    public PlayerSessionManager(CheckmateProperties checkmateProperties) {
        this.playerSessions = new ExpirableList<>(checkmateProperties.getSessionExpiration());
    }

    @Override
    public PlayerSession getSession(String username) {
        Optional<PlayerSession> session = playerSessions.stream()
                .filter(userSession -> userSession.username().equals(username))
                .findFirst();
        return session.orElseThrow(() -> new InvalidSessionException("Invalid username '" + username + "'"));
    }

    @Override
    public PlayerSession getSessionByToken(String token) {
        Optional<PlayerSession> session = playerSessions.stream()
                .filter(userSession -> userSession.token().equals(token))
                .findFirst();
        return session.orElseThrow(() -> new InvalidSessionException("Invalid token"));
    }

    @Override
    public PlayerSession createSession(String username) {
        playerSessions.expire(); //check for expired sessions
        validateUsername(username);
        PlayerSession newPlayerSession = new PlayerSession(username);
        playerSessions.add(newPlayerSession);
        return newPlayerSession;
    }

    private void validateUsername(String username) {
        if (username.isBlank()) {
            throw new InvalidUsernameException("Username must not be blank");
        } else if (username.length() < 4 || username.length() > 10) {
            throw new InvalidUsernameException("Username length must be 4 to 10 characters");
        }
        Optional<PlayerSession> session = playerSessions.stream()
                .filter(userSession -> userSession.username().equals(username))
                .findFirst();
        if (session.isPresent()) {
            throw new InvalidUsernameException("User with username " + username + " already exists");
        }
    }

}
