package com.openclassrooms.mdd_api.dto.comment;

import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.time.LocalDate;

/**
 * Data Transfer Object for a comment.
 *
 * @param id         the unique ID of the comment
 * @param content    the text content of the comment
 * @param user       the user who wrote the comment
 * @param created_at the date when the comment was created
 * @param updated_at the date when the comment was last updated
 */
public record CommentDto(int id, String content, UserDto user, LocalDate created_at, LocalDate updated_at) {
}
