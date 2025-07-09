package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

	private final UserRepository userRepository;

	private UserService(final UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(int id) {
		Optional<User> user = this.userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new RuntimeException("User not found");
		}
	}

	public void deleteUser(int id) {
		Optional<User> foundedUser = userRepository.findById(id);
		if (foundedUser.isPresent()) {
			userRepository.delete(foundedUser.get());
		} else {
			throw new RuntimeException("user Not Found !");
		}
	}
}
