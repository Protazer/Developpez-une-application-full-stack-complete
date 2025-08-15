package com.openclassrooms.mdd_api.dto.comment;

import com.openclassrooms.mdd_api.dto.user.UserDto;

import java.time.LocalDate;

public record GetCommentResponseDto(int id, String content, UserDto user, LocalDate created_at, LocalDate updated_at) {
}
