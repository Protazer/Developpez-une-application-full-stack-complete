package com.openclassrooms.mdd_api.controllers;

import com.openclassrooms.mdd_api.dto.comment.CreateCommentRequest;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.service.implementations.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller that handles actions related to comments.
 */
@RestController
@RequestMapping("api/comments")
public class CommentController {

    private final CommentService commentService;

    /**
     * Constructor that injects the comment service.
     *
     * @param commentService the service that manages comments
     */
    CommentController(final CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * Adds a comment to a post.
     *
     * @param token   the JWT token that contains the user's identity
     * @param request the comment data (post ID and content)
     * @return the created comment or an error
     */
    @PostMapping
    public ResponseEntity<?> addComment(final JwtAuthenticationToken token,
                                        @Valid @RequestBody final CreateCommentRequest request) {
        try {
            return ResponseEntity.ok().body(this.commentService.addPostComment(token, request));
        } catch (ApiNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }
}
