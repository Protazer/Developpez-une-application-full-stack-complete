package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Comment entity.
 * Extends JpaRepository to provide CRUD operations for comments.
 */
public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
