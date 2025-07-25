package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.payload.request.UserLoginRequestDto;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.GetUserResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponseDto;
import com.openclassrooms.mdd_api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	private final UserService userService;

	public AuthController(final UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<UserAuthResponseDto> register(@Valid @RequestBody final UserRegisterDto user) {
		UserAuthResponseDto userAuthResponseDto = userService.registerUser(user);
		return ResponseEntity.ok().body(userAuthResponseDto);
	}

	@PostMapping("/login")
	public ResponseEntity<UserAuthResponseDto> login(@Valid @RequestBody final UserLoginRequestDto user) {
		UserAuthResponseDto userAuthResponseDto = userService.loginUser(user);
		return ResponseEntity.ok().body(userAuthResponseDto);
	}

	@GetMapping("/me")
	public ResponseEntity<GetUserResponseDto> getUser(final JwtAuthenticationToken token) {
		GetUserResponseDto user = userService.getUser(token);
		return ResponseEntity.ok().body(user);
	}
}
