package com.openclassrooms.mdd_api.service.interfaces;

import com.openclassrooms.mdd_api.dto.user.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

/**
 * Interface for user-related services.
 */
public interface IUserService {

    /**
     * Register a new user.
     *
     * @param user the registration data
     * @return authentication response with token
     */
    UserAuthResponseDto registerUser(final UserRegisterRequestDto user);

    /**
     * Login a user with username or email and password.
     *
     * @param user the login data
     * @return authentication response with token
     */
    UserAuthResponseDto loginUser(final UserLoginRequestDto user);

    /**
     * Get user information from token.
     *
     * @param token authentication token
     * @return user information data
     */
    GetUserResponseDto getUser(final JwtAuthenticationToken token);

    /**
     * Update user information.
     *
     * @param token authentication token
     * @param user  new user data for update
     * @return updated user information data
     */
    GetUserResponseDto updateUser(final JwtAuthenticationToken token, final UserUpdateRequestDto user);
}
