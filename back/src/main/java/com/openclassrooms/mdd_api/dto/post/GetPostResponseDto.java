package com.openclassrooms.mdd_api.dto.post;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.topic.TopicDto;
import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO used to send post data in responses.
 *
 * @param id         the unique ID of the post
 * @param title      the title of the post
 * @param content    the main text content of the post
 * @param author     the user who created the post
 * @param comments   the list of comments related to the post
 * @param topic      the topic this post belongs to
 * @param created_at the date when the post was created
 * @param updated_at the date when the post was last updated
 */
public record GetPostResponseDto(int id, String title, String content, UserDto author, List<CommentDto> comments,
                                 TopicDto topic,
                                 LocalDate created_at, LocalDate updated_at) {
}
