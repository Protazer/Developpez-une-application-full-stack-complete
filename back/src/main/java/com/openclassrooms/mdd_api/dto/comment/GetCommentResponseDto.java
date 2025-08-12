package com.openclassrooms.mdd_api.dto.comment;

import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.util.Date;

public record GetCommentResponseDto(int id, String content, UserDto user, Date created_at, Date updated_at) {
}
