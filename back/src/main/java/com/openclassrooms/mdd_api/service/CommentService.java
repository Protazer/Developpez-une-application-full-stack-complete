package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Comment;
import com.openclassrooms.mdd_api.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService implements ICommentService {

	private final CommentRepository commentRepository;

	private CommentService(final CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	@Override
	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}

	@Override
	public Optional<Comment> getCommentById(int id) {
		return commentRepository.findById(id);
	}
}
