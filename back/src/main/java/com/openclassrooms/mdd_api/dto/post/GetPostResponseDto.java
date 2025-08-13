package com.openclassrooms.mdd_api.dto.post;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.util.Date;
import java.util.List;

public record GetPostResponseDto(int id, String title, String content, UserDto author, List<CommentDto> comments,
                                 Date created_at, Date updated_at) {
}
