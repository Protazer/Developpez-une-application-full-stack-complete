package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.User;

public interface IJWTService {
	String generateToken(final User user);
}
