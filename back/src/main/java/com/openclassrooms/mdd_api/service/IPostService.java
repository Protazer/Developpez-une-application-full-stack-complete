package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.post.CreatePostRequestDto;
import com.openclassrooms.mdd_api.dto.post.GetPostResponseDto;
import com.openclassrooms.mdd_api.model.Post;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;
import java.util.Optional;

public interface IPostService {
    List<GetPostResponseDto> getAllPostsByTopicIds(JwtAuthenticationToken token);

    Optional<Post> getPostById(int id);

    void createPost(JwtAuthenticationToken token, CreatePostRequestDto post);
}
