package com.openclassrooms.mdd_api.service.interfaces;

import com.openclassrooms.mdd_api.dto.post.CreatePostRequestDto;
import com.openclassrooms.mdd_api.dto.post.GetPostResponseDto;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

/**
 * Interface for post-related services.
 */
public interface IPostService {

    /**
     * Get all posts for topics subscribed by the user.
     *
     * @param token authentication token of the user
     * @return list of posts for the user's subscribed topics
     */
    List<GetPostResponseDto> getAllPostsByTopicIds(final JwtAuthenticationToken token);

    /**
     * Get a post by its ID.
     *
     * @param id the ID of the post
     * @return the post data
     */
    GetPostResponseDto getPostById(final int id);

    /**
     * Create a new post.
     *
     * @param token authentication token of the user creating the post
     * @param post  the post data to create
     */
    void createPost(final JwtAuthenticationToken token, final CreatePostRequestDto post);

}
