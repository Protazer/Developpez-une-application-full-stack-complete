package com.openclassrooms.mdd_api.payload.response;

import java.util.List;

public record TopicUserListDto(List<TopicUserDto> topicUsers) {
}
