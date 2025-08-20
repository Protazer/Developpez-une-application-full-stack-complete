package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.dto.post.CreatePostRequestDto;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.service.implementations.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

/**
 * Controller that handles post-related actions.
 */
@RestController
@RequestMapping("api/posts")
public class PostController {

    private final PostService postService;

    /**
     * Constructor that injects the post service.
     *
     * @param postService the service that manages posts
     */
    PostController(final PostService postService) {
        this.postService = postService;
    }

    /**
     * Gets all posts related to the topics the user is subscribed to.
     *
     * @param token the JWT token to identify the user
     * @return a list of posts or a 404 error
     */
    @GetMapping("")
    public ResponseEntity<?> getPosts(final JwtAuthenticationToken token) {
        try {
            return ResponseEntity.ok().body(this.postService.getAllPostsByTopicIds(token));
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    /**
     * Gets a single post by its ID.
     *
     * @param id the ID of the post
     * @return the post data or a 404 error
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable final int id) {
        try {
            return ResponseEntity.ok().body(this.postService.getPostById(id));
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    /**
     * Creates a new post.
     *
     * @param token   the JWT token to identify the user
     * @param request the post content and topic info
     * @return an empty 200 OK if successful, or a 400 error
     */
    @PostMapping
    public ResponseEntity<?> createPost(final JwtAuthenticationToken token,
                                        @Valid @RequestBody final CreatePostRequestDto request) {
        try {
            // Try to create the post with the given data
            this.postService.createPost(token, request);
            return ResponseEntity.ok().build(); // Success with no content
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
}
