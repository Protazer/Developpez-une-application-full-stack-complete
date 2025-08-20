package com.openclassrooms.mdd_api.dto.topic;

/**
 * Data Transfer Object for topic details.
 *
 * @param id      the unique ID of the topic
 * @param title   the title of the topic
 * @param content the description or content of the topic
 */
public record TopicDto(int id, String title, String content) {
}
