package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.request.UserUpdateRequestDto;
import com.openclassrooms.mdd_api.payload.response.GetUserResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserMapper {

	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final TopicMapper topicMapper;


	public UserMapper(final BCryptPasswordEncoder bCryptPasswordEncoder, final TopicMapper topicMapper) {
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.topicMapper = topicMapper;
	}

	public GetUserResponseDto toDto(final User user) {
		List<UserTopicDto> topicsList = new ArrayList<>();
		user.getTopics().forEach(topic -> {
			UserTopicDto topicDto = this.topicMapper.toUserTopicDto(topic);
			topicsList.add(topicDto);
		});
		return new GetUserResponseDto(user.getId(), user.getName(), user.getEmail(), topicsList, user.getCreatedAt(), user.getUpdatedAt());
	}

	public User toUpdatedUser(final User currentUser, final UserUpdateRequestDto user) {
		currentUser.setName(user.username());
		currentUser.setEmail(user.email());
		currentUser.setPassword(bCryptPasswordEncoder.encode(user.password()));
		return currentUser;
	}

	public User UserRegisterToEntity(final UserRegisterDto user) {
		User newUser = new User();
		newUser.setName(user.name());
		newUser.setEmail(user.email());
		newUser.setPassword(bCryptPasswordEncoder.encode(user.password()));
		return newUser;
	}
}
