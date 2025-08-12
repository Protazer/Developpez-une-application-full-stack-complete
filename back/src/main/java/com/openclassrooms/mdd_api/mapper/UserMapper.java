package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import com.openclassrooms.mdd_api.dto.user.GetUserResponseDto;
import com.openclassrooms.mdd_api.dto.user.UserDto;
import com.openclassrooms.mdd_api.dto.user.UserRegisterRequestDto;
import com.openclassrooms.mdd_api.dto.user.UserUpdateRequestDto;
import com.openclassrooms.mdd_api.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapper {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TopicMapper topicMapper;


    public UserMapper(final BCryptPasswordEncoder bCryptPasswordEncoder, final TopicMapper topicMapper) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.topicMapper = topicMapper;
    }

    public UserDto toUserDto(final User user) {
        List<GetTopicResponseDto> topicsList = user.getTopics().stream().map(this.topicMapper::toTopicDto).toList();
        return new UserDto(user.getId(), user.getName(), user.getEmail(), topicsList, user.getCreatedAt(), user.getUpdatedAt());
    }

    public GetUserResponseDto toGetUserResponseDto(final User user) {
        List<GetTopicResponseDto> topicsList = user.getTopics().stream().map(this.topicMapper::toTopicDto).toList();
        return new GetUserResponseDto(user.getId(), user.getName(), user.getEmail(), topicsList, user.getCreatedAt(), user.getUpdatedAt());
    }

    public User toUpdatedUser(final User currentUser, final UserUpdateRequestDto user) {
        currentUser.setName(user.username());
        currentUser.setEmail(user.email());
        currentUser.setPassword(bCryptPasswordEncoder.encode(user.password()));
        return currentUser;
    }

    public User UserRegisterToEntity(final UserRegisterRequestDto user) {
        User newUser = new User();
        newUser.setName(user.name());
        newUser.setEmail(user.email());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.password()));
        return newUser;
    }
}
