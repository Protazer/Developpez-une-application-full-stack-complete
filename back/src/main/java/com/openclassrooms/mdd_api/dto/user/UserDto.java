package com.openclassrooms.mdd_api.dto.user;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;

import java.time.LocalDate;
import java.util.List;

public record UserDto(int id, String name, String email, List<GetTopicResponseDto> topics, LocalDate created_at,
                      LocalDate updated_at) {
}
