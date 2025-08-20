package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.model.Comment;
import org.springframework.stereotype.Service;

/**
 * Service to convert Comment entities to CommentDto objects.
 */
@Service
public class CommentMapper {
    private final UserMapper userMapper;

    /**
     * Constructor with dependency injection of UserMapper.
     *
     * @param userMapper mapper to convert user entities
     */
    CommentMapper(final UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /**
     * Convert a Comment entity to a CommentDto.
     *
     * @param comment the Comment entity
     * @return the CommentDto with user info mapped
     */
    public CommentDto toDto(final Comment comment) {
        return new CommentDto(
                comment.getComment_id(),
                comment.getContent(),
                this.userMapper.toUserDto(comment.getUser()),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }
}
