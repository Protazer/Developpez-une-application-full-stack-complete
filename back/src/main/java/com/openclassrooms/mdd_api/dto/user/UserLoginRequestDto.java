package com.openclassrooms.mdd_api.dto.user;

import jakarta.validation.constraints.NotEmpty;

/**
 * DTO for user login request.
 *
 * @param name     the user's email or username (cannot be empty)
 * @param password the user's password (cannot be empty)
 */
public record UserLoginRequestDto(@NotEmpty(message = "E-mail or username is mandatory !") String name,
                                  @NotEmpty(message = "Password is mandatory ") String password) {
}
