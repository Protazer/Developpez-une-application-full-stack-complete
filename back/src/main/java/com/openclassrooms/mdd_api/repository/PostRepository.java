package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByTopic_TopicIdIn(List<Integer> topicIds);
}
