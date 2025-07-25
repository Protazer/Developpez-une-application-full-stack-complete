package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import com.openclassrooms.mdd_api.payload.response.UserTopicListDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicMapper {

	public UserTopicListDto toUserTopicList(final List<UserTopicDto> topics) {
		return new UserTopicListDto(topics);
	}

	public UserTopicDto toUserTopicDto(final Topic topic) {
		return new UserTopicDto(topic.getTopicId(), topic.getTitle(), topic.getContent());
	}
}
