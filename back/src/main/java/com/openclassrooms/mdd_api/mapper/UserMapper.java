package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.UserResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserMapper(BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public UserResponse toDto(final User user) {
		return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getTopics(), user.getCreatedAt(), user.getUpdatedAt());
	}

	public User UserRegisterToEntity(final UserRegisterDto user) {
		User newUser = new User();
		newUser.setName(user.name());
		newUser.setEmail(user.email());
		newUser.setPassword(bCryptPasswordEncoder.encode(user.password()));
		return newUser;
	}
}
