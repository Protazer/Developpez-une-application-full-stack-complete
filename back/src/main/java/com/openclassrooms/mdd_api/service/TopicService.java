package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService implements ITopicService {

	private final TopicRepository topicRepository;

	private TopicService(final TopicRepository topicRepository) {
		this.topicRepository = topicRepository;
	}

	public List<Topic> getAllTopics() {
		return topicRepository.findAll();
	}

	public Optional<Topic> getTopicById(int id) {
		return topicRepository.findById(id);
	}
}
