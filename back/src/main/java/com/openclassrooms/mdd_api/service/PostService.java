package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService implements IPostService {

	private final PostRepository postRepository;

	private PostService(final PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}

	public Optional<Post> getPostById(int id) {
		return postRepository.findById(id);
	}
}
