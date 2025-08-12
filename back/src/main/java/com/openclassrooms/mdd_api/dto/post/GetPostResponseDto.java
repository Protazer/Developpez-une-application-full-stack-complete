package com.openclassrooms.mdd_api.dto.post;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;

import java.util.Date;
import java.util.List;

public record GetPostResponseDto(int id, String title, String content, String author, List<CommentDto> comments,
                                 Date created_at, Date updated_at) {
}
