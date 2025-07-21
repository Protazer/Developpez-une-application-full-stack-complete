package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.mapper.UserMapper;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.response.UserResponse;
import com.openclassrooms.mdd_api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

	private final UserService userService;
	private final UserMapper userMapper;

	UserController(final UserService userService, final UserMapper userMapper) {
		this.userService = userService;
		this.userMapper = userMapper;
	}

	@GetMapping("/me")
	public ResponseEntity<UserResponse> getUser() {
		User user = userService.getUserById(1);
		return new ResponseEntity<UserResponse>(userMapper.toDto(user), HttpStatus.OK);
	}
}
