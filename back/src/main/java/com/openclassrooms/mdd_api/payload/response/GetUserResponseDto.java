package com.openclassrooms.mdd_api.payload.response;


import java.time.LocalDate;
import java.util.List;

public record GetUserResponseDto(int id, String name, String email, List<UserTopicDto> topics, LocalDate created_at,
                                 LocalDate updated_at) {
}
