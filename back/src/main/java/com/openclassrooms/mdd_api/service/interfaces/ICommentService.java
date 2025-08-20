package com.openclassrooms.mdd_api.service.interfaces;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.comment.CreateCommentRequest;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

/**
 * Interface for comment-related operations.
 */
public interface ICommentService {

    /**
     * Add a comment to a post.
     *
     * @param token   authentication token of the user adding the comment
     * @param comment data for the new comment
     * @return list of all comments for the post after adding the new comment
     */
    List<CommentDto> addPostComment(final JwtAuthenticationToken token, final CreateCommentRequest comment);
}
