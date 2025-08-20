package com.openclassrooms.mdd_api.mapper;

import com.openclassrooms.mdd_api.dto.comment.CommentDto;
import com.openclassrooms.mdd_api.dto.post.CreatePostRequestDto;
import com.openclassrooms.mdd_api.dto.post.GetPostResponseDto;
import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service to convert Post entities to DTOs and vice versa.
 */
@Service
public class PostMapper {
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final TopicMapper topicMapper;

    /**
     * Constructor with dependency injection of needed mappers.
     *
     * @param commentMapper mapper for comments
     * @param userMapper    mapper for users
     * @param topicMapper   mapper for topics
     */
    PostMapper(final CommentMapper commentMapper, final UserMapper userMapper, final TopicMapper topicMapper) {
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
        this.topicMapper = topicMapper;
    }

    /**
     * Convert a Post entity to a GetPostResponseDto including comments, author, and topic.
     *
     * @param post the Post entity
     * @return the GetPostResponseDto with all details
     */
    public GetPostResponseDto toGetPostResponseDto(final Post post) {
        List<CommentDto> postComments = post.getComments().stream()
                .map(this.commentMapper::toDto)
                .toList();
        return new GetPostResponseDto(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                this.userMapper.toUserDto(post.getAuthor()),
                postComments,
                this.topicMapper.toTopicDto(post.getTopic()),
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }

    /**
     * Create a Post entity from a CreatePostRequestDto, User and Topic.
     *
     * @param post  the CreatePostRequestDto with title, content and topicId
     * @param user  the User entity who is the author
     * @param topic the Topic entity of the post
     * @return the Post entity ready to be saved
     */
    public Post toEntity(final CreatePostRequestDto post, final User user, final Topic topic) {
        Post postEntity = new Post();
        postEntity.setAuthor(user);
        postEntity.setTitle(post.title());
        postEntity.setContent(post.content());
        postEntity.setComments(new ArrayList<>());
        postEntity.setTopic(topic);
        return postEntity;
    }
}
