package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
