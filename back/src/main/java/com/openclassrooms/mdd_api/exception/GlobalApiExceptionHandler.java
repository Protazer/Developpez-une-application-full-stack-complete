package com.openclassrooms.mdd_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Global handler for API exceptions.
 * <p>
 * Handles validation errors and other exceptions in one place.
 */
@ControllerAdvice
public class GlobalApiExceptionHandler {

    /**
     * Handle validation errors from @Valid annotations.
     *
     * @param ex exception containing validation errors
     * @return a map of field names and error messages with HTTP 400 status
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle custom API exceptions.
     *
     * @param exception the ApiNotFoundException thrown
     * @return a map containing the error message
     */
    @ExceptionHandler(ApiNotFoundException.class)
    public Map<String, String> handleApiNotFoundException(ApiNotFoundException exception) {
        Map<String, String> error = new HashMap<>();
        error.put("message", exception.getMessage());
        return error;
    }

    /**
     * Handle custom API exceptions.
     *
     * @param exception the ApiBadRequestException thrown
     * @return a map containing the error message
     */
    @ExceptionHandler(ApiBadRequestException.class)
    public Map<String, String> handleApiBadRequestException(ApiBadRequestException exception) {
        Map<String, String> error = new HashMap<>();
        error.put("message", exception.getMessage());
        return error;
    }

    /**
     * Handle other runtime exceptions.
     *
     * @param exception the RuntimeException thrown
     * @return a map containing the error message with HTTP 500 status
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException exception) {
        Map<String, String> error = new HashMap<>();
        error.put("message", exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
