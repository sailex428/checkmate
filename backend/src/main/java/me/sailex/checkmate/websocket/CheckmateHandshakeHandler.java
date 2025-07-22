package me.sailex.checkmate.websocket;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import me.sailex.checkmate.session.PlayerSession;
import me.sailex.checkmate.session.SessionManager;
import me.sailex.checkmate.session.exception.InvalidSessionException;
import org.apache.catalina.realm.GenericPrincipal;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

import static me.sailex.checkmate.session.UserSessionRestController.TOKEN_NAME;

public class CheckmateHandshakeHandler extends DefaultHandshakeHandler {

    private final SessionManager playerSessionManager;

    public CheckmateHandshakeHandler(SessionManager playerSessionManager) {
        this.playerSessionManager = playerSessionManager;
    }

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        try {
            String token = getTokenFromCookie(request);
            PlayerSession session = playerSessionManager.getSessionByToken(token);
            return new GenericPrincipal(session.username());
        } catch (InvalidSessionException e) {
            logger.error(e.getMessage());
            return new GenericPrincipal("invalid");
        }
    }

    private String getTokenFromCookie(ServerHttpRequest request) {
        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
            Cookie[] cookies = httpServletRequest.getCookies();

            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (TOKEN_NAME.equals(cookie.getName())) {
                        return cookie.getValue();
                    }
                }
            }
        }
        return null;
    }


}
