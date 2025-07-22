package me.sailex.checkmate.matchmaking;

import me.sailex.checkmate.config.APIPaths;
import me.sailex.checkmate.session.exception.InvalidSessionException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class MatchMakingController {

    private final SimpMessagingTemplate template;
    private final MatchMakingService matchMakingService;

    public MatchMakingController(MatchMakingService matchMakingService, SimpMessagingTemplate template) {
        this.matchMakingService = matchMakingService;
        this.template = template;
    }

    @MessageMapping(APIPaths.MATCH_REQUEST)
    public void matchRequest(Principal principal) {
        if (matchMakingService.addToMatchMaking(principal.getName())) {
            template.convertAndSendToUser(principal.getName(), APIPaths.MATCH_UPDATE,
                    new MatchResponse(principal.getName()));
        }
    }

    @MessageExceptionHandler
    @SendToUser(APIPaths.MATCH_ERRORS)
    public String handleException(InvalidSessionException invalidSessionException) {
        return invalidSessionException.getMessage();
    }

}
