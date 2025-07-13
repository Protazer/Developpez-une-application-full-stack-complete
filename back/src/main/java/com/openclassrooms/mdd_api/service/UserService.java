package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.mapper.UserMapper;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponse;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final JWTService jwtService;

	private UserService(final UserRepository userRepository, UserMapper userMapper, JWTService jwtService) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.jwtService = jwtService;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(int id) {
		Optional<User> user = this.userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new ApiException("User not found", HttpStatus.NOT_FOUND);
		}
	}

	public void deleteUser(int id) {
		Optional<User> foundedUser = userRepository.findById(id);
		if (foundedUser.isPresent()) {
			userRepository.delete(foundedUser.get());
		} else {
			throw new ApiException("User not found", HttpStatus.NOT_FOUND);
		}
	}

	public UserAuthResponse registerUser(final UserRegisterDto user) {
		Optional<User> userExist = userRepository.findByNameOrEmail(user.name(), user.email());
		if (userExist.isPresent()) {
			throw new ApiException("User Already exist", HttpStatus.BAD_REQUEST);
		}
		User newUser = userMapper.UserRegisterToEntity(user);
		userRepository.save(newUser);
		String token = jwtService.generateToken(newUser);
		return new UserAuthResponse(token);
	}
}
