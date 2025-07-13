package com.openclassrooms.mdd_api.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UserRegisterDto(
		@NotEmpty(message = "Email is mandatory") @Email(message = "Email must be a valid address") String email,
		@NotEmpty(message = "Message is mandatory") String name,
		@NotEmpty(message = "Password is mandatory ") String password) {

}

