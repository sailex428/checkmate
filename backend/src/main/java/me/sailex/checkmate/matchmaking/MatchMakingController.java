package me.sailex.checkmate.matchmaking;

import me.sailex.checkmate.config.APIPaths;
import me.sailex.checkmate.session.exception.InvalidSessionException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class MatchMakingController {

    private final MatchMakingService matchMakingService;

    public MatchMakingController(MatchMakingService matchMakingService) {
        this.matchMakingService = matchMakingService;
    }

    @MessageMapping(APIPaths.MATCH_REQUEST)
    @SendToUser(APIPaths.MATCH_UPDATE)
    public MatchResponse matchRequest(Principal principal) {
        matchMakingService.addToMatchMaking(principal.getName());
        return new MatchResponse(principal.getName());
    }

    @MessageExceptionHandler
    @SendToUser(APIPaths.MATCH_ERRORS)
    public String handleException(InvalidSessionException invalidSessionException) {
        return invalidSessionException.getMessage();
    }

}
