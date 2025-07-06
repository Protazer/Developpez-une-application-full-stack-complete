package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.data.repository.CrudRepository;

public interface TopicRepository extends CrudRepository<Topic, Integer> {
}
