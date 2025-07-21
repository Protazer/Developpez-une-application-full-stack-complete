package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Integer> {
}
