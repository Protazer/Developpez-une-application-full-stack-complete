package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;

import java.util.List;

public interface IUserService {
	List<User> getAllUsers();

	User getUserById(int id) throws Throwable;

	void deleteUser(int id);
}
