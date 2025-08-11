package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicMapper {


    public List<UserTopicDto> toUserTopicList(final List<Topic> topics) {
        List<UserTopicDto> topicsList = new ArrayList<>();
        topics.forEach(topic -> {
            UserTopicDto currentTopic = this.toUserTopicDto(topic);
            topicsList.add(currentTopic);
        });
        return topicsList;
    }

    public UserTopicDto toUserTopicDto(final Topic topic) {
        return new UserTopicDto(topic.getTopicId(), topic.getTitle(), topic.getContent());
    }

}
