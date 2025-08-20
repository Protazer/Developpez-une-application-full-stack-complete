package com.openclassrooms.mdd_api.dto.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for creating a new comment with validation.
 *
 * @param postId  the ID of the post to comment on (cannot be null)
 * @param content the content of the comment (cannot be empty)
 */
public record CreateCommentRequest(@NotNull(message = "Post id is mandatory !") Integer postId,
                                   @NotEmpty(message = "Content is mandatory !") String content) {
}
