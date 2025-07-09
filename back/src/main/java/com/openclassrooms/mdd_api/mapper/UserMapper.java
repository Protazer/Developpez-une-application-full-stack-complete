package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

	public UserResponse toDto(final User user) {

		return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt(), user.getUpdatedAt(), user.getTopics());
	}
}
