package com.openclassrooms.mdd_api.dto.user;

/**
 * DTO used to send the authentication token after login or registration.
 *
 * @param token the JWT token for the authenticated user
 */
public record UserAuthResponseDto(String token) {
}
