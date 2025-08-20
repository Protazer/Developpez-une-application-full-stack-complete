package com.openclassrooms.mdd_api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

/**
 * DTO for updating user information with validation.
 *
 * @param username the new username (cannot be empty)
 * @param email    the new email address (must be valid and not empty)
 * @param password the new password (cannot be empty)
 */
public record UserUpdateRequestDto(@NotEmpty(message = "Username is mandatory") String username,
                                   @NotEmpty(message = "Email is mandatory") @Email(message = "Email must be a valid address") String email,
                                   @NotEmpty(message = "Password is mandatory ") String password) {
}
