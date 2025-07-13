package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponse;
import com.openclassrooms.mdd_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	private final UserService userService;

	public AuthController(final UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<UserAuthResponse> register(@RequestBody final UserRegisterDto user) {
		UserAuthResponse userAuthResponse = userService.registerUser(user);
		return ResponseEntity.ok().body(userAuthResponse);
	}
}
