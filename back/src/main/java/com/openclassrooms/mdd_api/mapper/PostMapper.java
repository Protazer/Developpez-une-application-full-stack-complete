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

@Service
public class PostMapper {
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final TopicMapper topicMapper;

    PostMapper(final CommentMapper commentMapper, final UserMapper userMapper, final TopicMapper topicMapper) {
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
        this.topicMapper = topicMapper;
    }

    public GetPostResponseDto toGetPostResponseDto(Post post) {
        List<CommentDto> postComments = post.getComments().stream().map(this.commentMapper::toDto).toList();
        return new GetPostResponseDto(post.getPostId(), post.getTitle(), post.getContent(), this.userMapper.toUserDto(post.getAuthor()), postComments, this.topicMapper.toTopicDto(post.getTopic()), post.getCreatedAt(), post.getUpdatedAt());
    }

    public Post toEntity(CreatePostRequestDto post, User user, Topic topic) {
        Post postEntity = new Post();
        postEntity.setAuthor(user);
        postEntity.setTitle(post.title());
        postEntity.setContent(post.content());
        postEntity.setComments(new ArrayList<>());
        postEntity.setTopic(topic);
        return postEntity;
    }

}
