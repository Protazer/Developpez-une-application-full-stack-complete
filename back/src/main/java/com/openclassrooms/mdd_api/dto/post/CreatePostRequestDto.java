package com.openclassrooms.mdd_api.dto.post;

import jakarta.validation.constraints.NotEmpty;

/**
 * DTO for creating a new post with validation.
 *
 * @param title   the title of the post (cannot be empty)
 * @param content the content of the post (cannot be empty)
 * @param topicId the ID of the topic (cannot be empty)
 */
public record CreatePostRequestDto(@NotEmpty(message = "Title is mandatory !") String title,
                                   @NotEmpty(message = "Content is mandatory !") String content,
                                   @NotEmpty(message = "Topic id is mandatory !") String topicId) {
}
