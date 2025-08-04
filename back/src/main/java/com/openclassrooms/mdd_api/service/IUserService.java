package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserLoginRequestDto;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.request.UserUpdateRequestDto;
import com.openclassrooms.mdd_api.payload.response.GetUserResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponseDto;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

public interface IUserService {
	List<User> getAllUsers();

	User getUserById(int id);

	void deleteUser(int id);

	UserAuthResponseDto registerUser(final UserRegisterDto user);

	UserAuthResponseDto loginUser(final UserLoginRequestDto user);

	GetUserResponseDto getUser(final JwtAuthenticationToken token);

	GetUserResponseDto updateUser(final JwtAuthenticationToken token, final UserUpdateRequestDto user);
}
