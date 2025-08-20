package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for User entity.
 * <p>
 * Extends JpaRepository to provide CRUD operations for users.
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Find a user by name or email.
     *
     * @param name  the username to search
     * @param email the user email to search
     * @return an Optional containing the found user or empty if not found
     */
    Optional<User> findByNameOrEmail(String name, String email);

    /**
     * Find a user by name.
     *
     * @param name the user name to search
     * @return an Optional containing the found user or empty if not found
     */
    Optional<User> findByName(String name);

    /**
     * Find a user by email.
     *
     * @param email the user email to search
     * @return an Optional containing the found user or empty if not found
     */
    Optional<User> findByEmail(String email);
}
