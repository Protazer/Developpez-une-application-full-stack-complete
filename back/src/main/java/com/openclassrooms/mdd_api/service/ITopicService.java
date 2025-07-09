package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Topic;

import java.util.List;
import java.util.Optional;

public interface ITopicService {
	List<Topic> getAllTopics();

	Optional<Topic> getTopicById(int id);
}
