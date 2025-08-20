package com.openclassrooms.mdd_api.service.interfaces;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

/**
 * Interface for topic-related services.
 */
public interface ITopicService {

    /**
     * Get all topics available.
     *
     * @return list of all topics
     */
    List<GetTopicResponseDto> getAllTopics();

    /**
     * Subscribe the user to a topic.
     *
     * @param token  authentication token of the user
     * @param userId the ID of the topic to subscribe to
     * @return list of topics after subscribing
     */
    List<GetTopicResponseDto> subscribeTopic(final JwtAuthenticationToken token, final int userId);

    /**
     * Unsubscribe the user from a topic.
     *
     * @param token  authentication token of the user
     * @param userId the ID of the topic to unsubscribe from
     * @return list of topics after unsubscribing
     */
    List<GetTopicResponseDto> unsubscribeTopic(final JwtAuthenticationToken token, final int userId);
}
