package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.dto.user.GetUserResponseDto;
import com.openclassrooms.mdd_api.dto.user.UserAuthResponseDto;
import com.openclassrooms.mdd_api.dto.user.UserLoginRequestDto;
import com.openclassrooms.mdd_api.dto.user.UserRegisterRequestDto;
import com.openclassrooms.mdd_api.exception.ApiBadRequestException;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.service.implementations.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

/**
 * Controller that handles user authentication (register, login, and get current user).
 */
@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final UserService userService;

    /**
     * Constructor that injects the user service.
     *
     * @param userService the service that manages user logic
     */
    public AuthController(final UserService userService) {
        this.userService = userService;
    }

    /**
     * Registers a new user.
     *
     * @param user the user registration data
     * @return a response with the registered user's info or an error
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody final UserRegisterRequestDto user) {
        try {
            UserAuthResponseDto userAuthResponseDto = userService.registerUser(user);
            return ResponseEntity.ok().body(userAuthResponseDto);
        } catch (ApiBadRequestException e) {
            return ResponseEntity.badRequest().body(e);
        }
    }

    /**
     * Logs in a user.
     *
     * @param user the login credentials
     * @return a response with a token if successful, or an error
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody final UserLoginRequestDto user) {
        try {
            UserAuthResponseDto userAuthResponseDto = userService.loginUser(user);
            return ResponseEntity.ok().body(userAuthResponseDto);
        } catch (
                ApiBadRequestException e) {
            return ResponseEntity.badRequest().body(e);
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    /**
     * Gets the currently authenticated user's information.
     *
     * @param token the JWT token that contains the user's identity
     * @return the user info or an error if not found
     */
    @GetMapping("/me")
    public ResponseEntity<?> getUser(final JwtAuthenticationToken token) {
        try {
            GetUserResponseDto user = userService.getUser(token);
            return ResponseEntity.ok().body(user);
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }
}
