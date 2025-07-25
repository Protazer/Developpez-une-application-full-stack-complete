package com.openclassrooms.mdd_api.payload.response;

import java.util.List;

public record UserTopicListDto(List<UserTopicDto> topics) {
}
