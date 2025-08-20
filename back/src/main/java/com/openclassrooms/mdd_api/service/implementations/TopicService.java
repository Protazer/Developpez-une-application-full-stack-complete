package com.openclassrooms.mdd_api.service.implementations;

import com.openclassrooms.mdd_api.dto.topic.GetTopicResponseDto;
import com.openclassrooms.mdd_api.exception.ApiNotFoundException;
import com.openclassrooms.mdd_api.mapper.TopicMapper;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import com.openclassrooms.mdd_api.service.interfaces.ITopicService;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Service to manage topics and user subscriptions.
 */
@Service
public class TopicService implements ITopicService {

    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final TopicMapper topicMapper;

    /**
     * Constructor for TopicService.
     *
     * @param topicRepository repository for topics
     * @param userRepository  repository for users
     * @param topicMapper     mapper to convert Topic entities to DTOs
     */
    private TopicService(final TopicRepository topicRepository, final UserRepository userRepository, final TopicMapper topicMapper) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.topicMapper = topicMapper;
    }

    /**
     * Get all topics sorted by title.
     *
     * @return list of topics as DTOs
     */
    @Override
    public List<GetTopicResponseDto> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();
        topics.sort(Comparator.comparing(Topic::getTitle));
        return topics.stream().map(this.topicMapper::toGetTopicResponseDto).toList();
    }

    /**
     * Unsubscribe the user from a topic.
     *
     * @param token authentication token containing user info
     * @param id    the ID of the topic to unsubscribe from
     * @return updated list of user's subscribed topics as DTOs
     * @throws ApiNotFoundException if user or topic is not found or on error
     */
    @Override
    public List<GetTopicResponseDto> unsubscribeTopic(final JwtAuthenticationToken token, final int id) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Topic> foundTopic = this.topicRepository.findById(id);
        if (foundTopic.isPresent() && user.isPresent()) {
            Topic currentTopic = foundTopic.get();
            currentTopic.removeUser(user.get());
            this.topicRepository.save(currentTopic);
            List<Topic> topicsList = user.get().getTopics();
            topicsList.sort(Comparator.comparing(Topic::getTitle));
            return topicsList.stream().map(this.topicMapper::toGetTopicResponseDto).toList();
        } else {
            throw new ApiNotFoundException("Utilisateur ou topic non trouvé");
        }
    }

    /**
     * Subscribe the user to a topic.
     *
     * @param token authentication token containing user info
     * @param id    the ID of the topic to subscribe to
     * @return updated list of user's subscribed topics as DTOs
     * @throws ApiNotFoundException if user or topic is not found or on error
     */
    @Override
    public List<GetTopicResponseDto> subscribeTopic(final JwtAuthenticationToken token, final int id) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Topic> foundTopic = this.topicRepository.findById(id);
        if (foundTopic.isPresent() && user.isPresent()) {
            foundTopic.get().addUser(user.get());
            this.topicRepository.save(foundTopic.get());
            List<Topic> topicsList = user.get().getTopics();
            topicsList.sort(Comparator.comparing(Topic::getTitle));
            return topicsList.stream().map(this.topicMapper::toGetTopicResponseDto).toList();
        } else {
            throw new ApiNotFoundException("Utilisateur ou topic non trouvé");
        }
    }
}
