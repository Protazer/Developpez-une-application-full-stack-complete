package com.openclassrooms.mdd_api.service.interfaces;

import com.openclassrooms.mdd_api.model.User;

/**
 * Interface for JWT token generation service.
 */
public interface IJWTService {

    /**
     * Generate a JWT token for a given user.
     *
     * @param user the user to generate the token for
     * @return the generated JWT token as a String
     */
    String generateToken(final User user);
}
