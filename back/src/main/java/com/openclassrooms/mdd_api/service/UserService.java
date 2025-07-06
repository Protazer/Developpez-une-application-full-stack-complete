package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserService implements IUserService {

	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public void deleteUser(Integer id) {
		Optional<User> foundedUser = userRepository.findById(id);
		if (foundedUser.isPresent()) {
			userRepository.delete(foundedUser.get());
		} else {
			throw new RuntimeException("user Not Found !");
		}
	}
}
