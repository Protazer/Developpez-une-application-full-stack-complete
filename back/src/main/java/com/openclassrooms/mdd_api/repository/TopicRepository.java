package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Topic entity.
 * Extends JpaRepository to provide CRUD operations for topics.
 */
public interface TopicRepository extends JpaRepository<Topic, Integer> {
}
