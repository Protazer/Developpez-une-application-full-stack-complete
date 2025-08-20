package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import com.openclassrooms.mdd_api.dto.topic.TopicDto;
import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.stereotype.Service;

/**
 * Service to convert Topic entities to different Topic DTOs.
 */
@Service
public class TopicMapper {

    /**
     * Convert a Topic entity to a simple TopicDto.
     *
     * @param topic the Topic entity
     * @return a TopicDto with basic topic info
     */
    public TopicDto toTopicDto(final Topic topic) {
        return new TopicDto(topic.getTopicId(), topic.getTitle(), topic.getContent());
    }

    /**
     * Convert a Topic entity to a GetTopicResponseDto.
     *
     * @param topic the Topic entity
     * @return a GetTopicResponseDto with topic details
     */
    public GetTopicResponseDto toGetTopicResponseDto(final Topic topic) {
        return new GetTopicResponseDto(topic.getTopicId(), topic.getTitle(), topic.getContent());
    }

}
