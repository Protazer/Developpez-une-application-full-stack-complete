package com.openclassrooms.mdd_api.service.implementations;

import com.openclassrooms.mdd_api.dto.post.CreatePostRequestDto;
import com.openclassrooms.mdd_api.dto.post.GetPostResponseDto;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.mapper.PostMapper;
import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.PostRepository;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import com.openclassrooms.mdd_api.service.interfaces.IPostService;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service to manage posts.
 */
@Service
public class PostService implements IPostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final PostMapper postMapper;

    /**
     * Constructor for PostService.
     *
     * @param postRepository  repository for posts
     * @param userRepository  repository for users
     * @param topicRepository repository for topics
     * @param postMapper      mapper to convert between Post and DTOs
     */
    private PostService(final PostRepository postRepository, final UserRepository userRepository,
                        final TopicRepository topicRepository, final PostMapper postMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.postMapper = postMapper;
    }

    /**
     * Get all posts for topics that the authenticated user follows.
     *
     * @param token authentication token containing user info
     * @return list of posts as DTOs
     * @throws ApiNotFoundException if user is not found
     */
    @Override
    public List<GetPostResponseDto> getAllPostsByTopicIds(final JwtAuthenticationToken token) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isPresent()) {
            List<Integer> subscribedTopicsIds = user.get().getTopics().stream()
                    .map(Topic::getTopicId)
                    .toList();
            List<Post> postsList = this.postRepository.findByTopic_TopicIdIn(subscribedTopicsIds);
            return postsList.stream().map(postMapper::toGetPostResponseDto).toList();
        } else {
            throw new ApiNotFoundException("Utilisateur non trouvé");
        }
    }

    /**
     * Create a new post for a user in a specific topic.
     *
     * @param token authentication token containing user info
     * @param post  data for the new post
     * @throws ApiNotFoundException if user or topic is not found
     */
    @Override
    public void createPost(final JwtAuthenticationToken token, final CreatePostRequestDto post) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Topic> topic = this.topicRepository.findById(Integer.parseInt(post.topicId()));

        if (user.isEmpty() || topic.isEmpty()) {
            throw new ApiNotFoundException("Utilisateur ou topic non trouvé");
        } else {
            Post newPost = this.postMapper.toEntity(post, user.get(), topic.get());
            this.postRepository.save(newPost);
        }
    }

    /**
     * Get a post by its ID.
     *
     * @param id the post ID
     * @return the post as a DTO
     * @throws ApiNotFoundException if the post is not found
     */
    @Override
    public GetPostResponseDto getPostById(final int id) {
        Optional<Post> foundPost = this.postRepository.findById(id);
        if (foundPost.isPresent()) {
            return postMapper.toGetPostResponseDto(foundPost.get());
        } else {
            throw new ApiNotFoundException("Post non trouvé");
        }
    }
}
