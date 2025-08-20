package com.openclassrooms.mdd_api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

/**
 * DTO for user registration request.
 *
 * @param email    the user's email (must be valid and not empty)
 * @param name     the user's name (cannot be empty)
 * @param password the user's password (cannot be empty)
 */
public record UserRegisterRequestDto(
        @NotEmpty(message = "Email is mandatory") @Email(message = "Email must be a valid address") String email,
        @NotEmpty(message = "Name is mandatory") String name,
        @NotEmpty(message = "Password is mandatory ") String password) {
}
