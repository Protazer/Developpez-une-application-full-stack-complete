package com.openclassrooms.mdd_api.dto.post;

public record CreatePostRequestDto(String title, String content, String topicId) {
}
