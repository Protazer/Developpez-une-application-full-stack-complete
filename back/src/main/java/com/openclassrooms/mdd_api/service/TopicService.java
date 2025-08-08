package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.mapper.TopicMapper;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.response.UserTopicDto;
import com.openclassrooms.mdd_api.payload.response.UserTopicListDto;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService implements ITopicService {

    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final TopicMapper topicMapper;

    private TopicService(final TopicRepository topicRepository, final UserRepository userRepository, final TopicMapper topicMapper) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.topicMapper = topicMapper;
    }

    @Override
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @Override
    public UserTopicListDto unsubscribeTopic(JwtAuthenticationToken token, int id) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Topic> foundTopic = this.topicRepository.findById(id);
        if (foundTopic.isPresent() && user.isPresent()) {
            Topic currentTopic = foundTopic.get();
            currentTopic.removeUser(user.get());
            this.topicRepository.save(currentTopic);
            List<UserTopicDto> topicsList = new ArrayList<>();
            user.get().getTopics().forEach(topic -> {
                UserTopicDto topicDto = this.topicMapper.toUserTopicDto(topic);
                topicsList.add(topicDto);
            });
            return this.topicMapper.toUserTopicList(topicsList);
        } else {
            throw new ApiException("Erreur lors du désabonnement !");
        }
    }

    @Override
    public UserTopicListDto subscribeTopic(JwtAuthenticationToken token, int id) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Topic> foundTopic = this.topicRepository.findById(id);
        if (foundTopic.isPresent() && user.isPresent()) {
            foundTopic.get().addUser(user.get());
            this.topicRepository.save(foundTopic.get());
            List<UserTopicDto> topicsList = new ArrayList<>();
            user.get().getTopics().forEach(topic -> {
                UserTopicDto topicDto = this.topicMapper.toUserTopicDto(topic);
                topicsList.add(topicDto);
            });
            return this.topicMapper.toUserTopicList(topicsList);
        } else {
            throw new ApiException("Erreur lors de l'abonnement !");
        }

    }
}
