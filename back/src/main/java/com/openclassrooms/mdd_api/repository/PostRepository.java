package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository interface for Post entity.
 * Extends JpaRepository to provide CRUD operations for posts.
 */
public interface PostRepository extends JpaRepository<Post, Integer> {

    /**
     * Find all posts where the topic ID is in the given list.
     *
     * @param topicIds list of topic IDs to filter posts
     * @return list of posts matching the topic IDs
     */
    List<Post> findByTopic_TopicIdIn(final List<Integer> topicIds);
}
