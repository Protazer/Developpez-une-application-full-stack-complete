package com.openclassrooms.mdd_api.dto.comment;

public record CreateCommentRequest(int postId, String content) {
}
