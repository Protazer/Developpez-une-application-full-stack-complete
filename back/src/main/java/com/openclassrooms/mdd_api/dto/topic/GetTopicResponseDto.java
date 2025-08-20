package com.openclassrooms.mdd_api.dto.topic;

/**
 * DTO used to send topic data in responses.
 *
 * @param id      the unique ID of the topic
 * @param title   the title of the topic
 * @param content the description or content of the topic
 */
public record GetTopicResponseDto(int id, String title, String content) {
}
