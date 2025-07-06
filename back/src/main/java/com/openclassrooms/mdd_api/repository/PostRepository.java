package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Integer> {
}
