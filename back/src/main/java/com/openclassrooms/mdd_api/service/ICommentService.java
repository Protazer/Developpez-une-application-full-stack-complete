package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Comment;

import java.util.List;
import java.util.Optional;

public interface ICommentService {
	List<Comment> getAllComments();

	Optional<Comment> getCommentById(int id);
}
