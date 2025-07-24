package me.sailex.checkmate.move;

import me.sailex.checkmate.config.APIPaths;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class MoveController {

    private final MoveService moveService;

    public MoveController(MoveService moveService) {
        this.moveService = moveService;
    }

    @MessageMapping(APIPaths.GAME_MOVE)
    public void move(
        @DestinationVariable String gameId, 
        ClientMoveRequest request, 
        Principal principal
    ) {
        moveService.doMove(gameId, request.move(), principal.getName());
    }

    @MessageExceptionHandler
    @SendToUser(APIPaths.GAME_MOVE_ERRORS)
    public String handleException(InvalidMoveException invalidMoveException) {
        return invalidMoveException.getMessage();
    }
}
