package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponse;

import java.util.List;

public interface IUserService {
	List<User> getAllUsers();

	User getUserById(int id);

	void deleteUser(int id);

	UserAuthResponse registerUser(final UserRegisterDto user);
}
