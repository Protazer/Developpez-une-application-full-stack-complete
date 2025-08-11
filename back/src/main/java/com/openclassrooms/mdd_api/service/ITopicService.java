package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

public interface ITopicService {
    List<UserTopicDto> getAllTopics();

    List<UserTopicDto> subscribeTopic(JwtAuthenticationToken token, int userId);

    List<UserTopicDto> unsubscribeTopic(JwtAuthenticationToken token, int userId);
}
