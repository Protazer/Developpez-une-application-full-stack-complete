package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.mapper.TopicMapper;
import com.openclassrooms.mdd_api.mapper.UserMapper;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserLoginRequestDto;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.GetUserResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final TopicMapper topicMapper;
	private final JWTService jwtService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private UserService(final UserRepository userRepository, UserMapper userMapper, JWTService jwtService, BCryptPasswordEncoder bCryptPasswordEncoder, TopicMapper topicMapper) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.topicMapper = topicMapper;
		this.jwtService = jwtService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserById(int id) {
		Optional<User> user = this.userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new ApiException("User not found", HttpStatus.NOT_FOUND);
		}
	}

	@Override
	public void deleteUser(int id) {
		Optional<User> foundedUser = userRepository.findById(id);
		if (foundedUser.isPresent()) {
			userRepository.delete(foundedUser.get());
		} else {
			throw new ApiException("User not found", HttpStatus.NOT_FOUND);
		}
	}

	@Override
	public UserAuthResponseDto registerUser(final UserRegisterDto user) {
		Optional<User> userExist = userRepository.findByNameOrEmail(user.name(), user.email());
		if (userExist.isPresent()) {
			throw new ApiException("User Already exist", HttpStatus.BAD_REQUEST);
		}
		User newUser = userMapper.UserRegisterToEntity(user);
		userRepository.save(newUser);
		String token = jwtService.generateToken(newUser);
		return new UserAuthResponseDto(token);
	}

	@Override
	public UserAuthResponseDto loginUser(final UserLoginRequestDto user) {
		Optional<User> findUser = userRepository.findByNameOrEmail(user.name(), user.name());
		if (findUser.isEmpty()) {
			throw new ApiException("Email or username not found", HttpStatus.UNAUTHORIZED);
		}
		boolean isLoginCorrect = bCryptPasswordEncoder.matches(user.password(), findUser.get().getPassword());
		if (!isLoginCorrect) {
			throw new ApiException("Email/Username/Password invalid", HttpStatus.UNAUTHORIZED);
		}
		String token = jwtService.generateToken(findUser.get());
		return new UserAuthResponseDto(token);
	}

	@Override
	public GetUserResponseDto getUser(final JwtAuthenticationToken token) {
		int userId = Integer.parseInt(token.getToken().getSubject());
		Optional<User> user = this.userRepository.findById(userId);
		if (user.isPresent()) {
			List<UserTopicDto> topicsList = new ArrayList<>();
			user.get().getTopics().forEach(topic -> {
				UserTopicDto topicDto = this.topicMapper.toUserTopicDto(topic);
				topicsList.add(topicDto);
			});
			return this.userMapper.toDto(user.get(), topicsList);

		} else {
			throw new ApiException("User not found", HttpStatus.NOT_FOUND);
		}

	}
}
