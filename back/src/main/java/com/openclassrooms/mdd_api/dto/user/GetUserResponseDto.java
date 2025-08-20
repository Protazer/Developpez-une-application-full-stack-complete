package com.openclassrooms.mdd_api.dto.user;

import com.openclassrooms.mdd_api.dto.topic.TopicDto;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO used to send user information in responses.
 *
 * @param id         the unique ID of the user
 * @param name       the user's name
 * @param email      the user's email address
 * @param topics     the list of topics the user is subscribed to
 * @param created_at the date when the user was created
 * @param updated_at the date when the user information was last updated
 */
public record GetUserResponseDto(int id, String name, String email, List<TopicDto> topics,
                                 LocalDate created_at,
                                 LocalDate updated_at) {
}
