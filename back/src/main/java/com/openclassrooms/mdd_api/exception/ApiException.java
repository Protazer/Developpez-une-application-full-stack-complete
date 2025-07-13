package com.openclassrooms.mdd_api.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
	private final String message;
	private final HttpStatus httpStatus;

	public ApiException(final String message, final HttpStatus httpStatus) {
		super(message);
		this.message = message;
		this.httpStatus = httpStatus;
	}

}
