package me.sailex.checkmate.exception;

import me.sailex.checkmate.session.exception.InvalidUsernameException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice(annotations = RestController.class)
public class ErrorControllerAdvice {

    private static final Logger logger = LoggerFactory.getLogger(ErrorControllerAdvice.class);

    @ExceptionHandler(InvalidUsernameException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public String userAlreadyExistsException(InvalidUsernameException e) {
        logger.error(e.getMessage());
        return e.getMessage();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String exception(Exception e) {
        logger.error(e.getMessage());
        return e.getMessage();
    }

}
