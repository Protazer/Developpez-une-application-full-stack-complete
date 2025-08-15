package com.openclassrooms.mdd_api.dto.post;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.topic.TopicDto;
import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.time.LocalDate;
import java.util.List;

public record GetPostResponseDto(int id, String title, String content, UserDto author, List<CommentDto> comments,
                                 TopicDto topic,
                                 LocalDate created_at, LocalDate updated_at) {
}
