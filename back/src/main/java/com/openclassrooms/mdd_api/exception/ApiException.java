package com.openclassrooms.mdd_api.exception;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
    private final String message;

    public ApiException(final String message) {
        super(message);
        this.message = message;
    }

}
