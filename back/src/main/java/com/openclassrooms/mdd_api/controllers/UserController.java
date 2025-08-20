package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.dto.user.GetUserResponseDto;
import com.openclassrooms.mdd_api.dto.user.UserUpdateRequestDto;
import com.openclassrooms.mdd_api.exception.ApiBadRequestException;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.service.implementations.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller that handles user-related actions.
 */
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    /**
     * Constructor that injects the user service.
     *
     * @param userService the service that manages user operations
     */
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    /**
     * Updates the current user's profile information.
     *
     * @param token   the JWT token that identifies the user
     * @param request the new user data to update (e.g., name, email)
     * @return the updated user info or an error
     */
    @PostMapping("")
    public ResponseEntity<?> updateUser(final JwtAuthenticationToken token,
                                        @Valid @RequestBody final UserUpdateRequestDto request) {
        try {
            GetUserResponseDto updatedUser = this.userService.updateUser(token, request);
            return ResponseEntity.ok().body(updatedUser);
        } catch (ApiBadRequestException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }
}
