package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Post;

import java.util.List;
import java.util.Optional;

public interface IPostService {
	List<Post> getAllPosts();

	Optional<Post> getPostById(int id);
}
