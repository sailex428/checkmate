package me.sailex.checkmate.session;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import me.sailex.checkmate.config.APIPaths;
import me.sailex.checkmate.config.CheckmateProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserSessionRestController {

    public static final String TOKEN_NAME = "CHECKMATE-SESSION";
    private final SessionManager sessionManager;
    private final CheckmateProperties properties;

    public UserSessionRestController(SessionManager sessionManager, CheckmateProperties properties) {
        this.sessionManager = sessionManager;
        this.properties = properties;
    }

    @GetMapping(APIPaths.SESSION)
    public ResponseEntity<LoginResponse> checkSession(@CookieValue(TOKEN_NAME) String token, HttpServletResponse response) {
        PlayerSession playerSession = sessionManager.getSessionByToken(token);
        if (playerSession == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        LoginResponse loginResponse = new LoginResponse(playerSession.username());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping(APIPaths.LOGIN)
    public ResponseEntity<LoginResponse> createSession(
        @RequestParam String username,
        HttpServletResponse response
    ) {
        PlayerSession playerSession = sessionManager.createSession(username);
        response.addCookie(buildCookie(playerSession.token()));

        LoginResponse loginResponse = new LoginResponse(playerSession.username());
        return ResponseEntity.ok(loginResponse);
    }

    private Cookie buildCookie(String value) {
        Cookie cookie = new Cookie(TOKEN_NAME, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(properties.getSessionExpiration());
        return cookie;
    }

}
