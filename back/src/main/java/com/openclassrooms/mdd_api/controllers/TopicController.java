package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.payload.response.UserTopicListDto;
import com.openclassrooms.mdd_api.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/topics")
public class TopicController {
    private final TopicService topicService;

    TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllTopics() {
        return ResponseEntity.ok().body(this.topicService.getAllTopics());
    }

    @PutMapping("/subscribe/{id}")
    public ResponseEntity<?> subscribeTopic(final JwtAuthenticationToken token, @PathVariable final int id) {
        try {
            UserTopicListDto userTopics = this.topicService.subscribeTopic(token, id);
            return ResponseEntity.ok().body(userTopics);
        } catch (ApiException e) {
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping(value = "/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeTopic(final JwtAuthenticationToken token, @PathVariable final int id) {
        try {
            UserTopicListDto userTopics = this.topicService.unsubscribeTopic(token, id);
            return ResponseEntity.ok().body(userTopics);
        } catch (ApiException e) {
            return ResponseEntity.badRequest().body(e);
        }
    }
}
