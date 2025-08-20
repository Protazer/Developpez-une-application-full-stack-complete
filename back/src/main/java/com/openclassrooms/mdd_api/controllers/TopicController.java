package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.service.implementations.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller that handles topic-related actions.
 */
@RestController
@RequestMapping("api/topics")
public class TopicController {

    private final TopicService topicService;

    /**
     * Constructor that injects the topic service.
     *
     * @param topicService the service that manages topics
     */
    TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    /**
     * Gets the list of all available topics.
     *
     * @return the list of topics
     */
    @GetMapping("")
    public ResponseEntity<?> getAllTopics() {
        return ResponseEntity.ok().body(this.topicService.getAllTopics());
    }

    /**
     * Subscribes the current user to a topic by its ID.
     *
     * @param token the JWT token to identify the user
     * @param id    the topic ID to subscribe to
     * @return the updated list of the user's subscribed topics or an error
     */
    @PutMapping("/subscribe/{id}")
    public ResponseEntity<?> subscribeTopic(final JwtAuthenticationToken token,
                                            @PathVariable final int id) {
        try {
            List<GetTopicResponseDto> userTopics = this.topicService.subscribeTopic(token, id);
            return ResponseEntity.ok().body(userTopics);
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    /**
     * Unsubscribes the current user from a topic by its ID.
     *
     * @param token the JWT token to identify the user
     * @param id    the topic ID to unsubscribe from
     * @return the updated list of the user's subscribed topics or an error
     */
    @PutMapping("/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeTopic(final JwtAuthenticationToken token,
                                              @PathVariable final int id) {
        try {
            List<GetTopicResponseDto> userTopics = this.topicService.unsubscribeTopic(token, id);
            return ResponseEntity.ok().body(userTopics);
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }
}
