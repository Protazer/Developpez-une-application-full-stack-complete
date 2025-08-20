package com.openclassrooms.mdd_api.exception;

import lombok.Getter;

/**
 * Custom exception class for API errors.
 * This exception holds an error message that can be used to provide details about the error.
 */
@Getter
public class ApiBadRequestException extends RuntimeException {
    private final String message;

    /**
     * Constructor to create an ApiBadRequestException with a specific message.
     *
     * @param message the error message
     */
    public ApiBadRequestException(final String message) {
        super(message);
        this.message = message;
    }
}
