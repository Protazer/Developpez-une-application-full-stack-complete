package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.stereotype.Service;

@Service
public class TopicMapper {

    public GetTopicResponseDto toTopicDto(final Topic topic) {
        return new GetTopicResponseDto(topic.getTopicId(), topic.getTitle(), topic.getContent());
    }

}
