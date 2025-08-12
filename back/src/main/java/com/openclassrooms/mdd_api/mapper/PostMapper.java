package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.post.GetPostResponseDto;
import com.openclassrooms.mdd_api.model.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostMapper {
    private final CommentMapper commentMapper;

    PostMapper(final CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public GetPostResponseDto toGetPostResponseDto(Post post) {
        List<CommentDto> postComments = post.getComments().stream().map(this.commentMapper::toDto).toList();
        return new GetPostResponseDto(post.getPostId(), post.getTitle(), post.getContent(), post.getAuthor(), postComments, post.getCreatedAt(), post.getUpdatedAt());
    }

}
