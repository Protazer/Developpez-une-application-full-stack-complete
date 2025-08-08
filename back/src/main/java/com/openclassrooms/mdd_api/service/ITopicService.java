package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.payload.response.UserTopicListDto;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

public interface ITopicService {
    List<Topic> getAllTopics();

    UserTopicListDto subscribeTopic(JwtAuthenticationToken token, int userId);

    UserTopicListDto unsubscribeTopic(JwtAuthenticationToken token, int userId);
}
