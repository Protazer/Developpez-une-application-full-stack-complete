package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
