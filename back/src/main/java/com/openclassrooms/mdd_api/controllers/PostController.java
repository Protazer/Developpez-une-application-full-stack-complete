package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/posts")
public class PostController {
    private final PostService postService;

    PostController(final PostService postService) {
        this.postService = postService;
    }

    @GetMapping("")
    public ResponseEntity<?> getPosts(final JwtAuthenticationToken token) {
        try {
            return ResponseEntity.ok().body(this.postService.getAllPostsByTopicIds(token));
        } catch (ApiException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }
}
