package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Topic entity represents a topic or category.
 */
@Data
@Entity
@Table(name = "topic")
public class Topic {

    /**
     * Unique id of the topic (primary key).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int topicId;

    /**
     * Title of the topic, max 255 characters.
     */
    @NotNull
    @Size(max = 255)
    private String title;

    /**
     * Content or description of the topic, max 2000 characters.
     */
    @Size(max = 2000)
    private String content;

    /**
     * List of users who follow or are interested in this topic.
     * Many-to-many relation with User.
     */
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "topics")
    private List<User> users = new ArrayList<>();

    /**
     * Add a user to this topic.
     * Also adds this topic to the user's topics list.
     *
     * @param user the user to add
     */
    public void addUser(User user) {
        users.add(user);
        List<Topic> userTopics = user.getTopics();
        userTopics.add(this);
        user.setTopics(userTopics);
    }

    /**
     * Remove a user from this topic.
     * Also removes this topic from the user's topics list.
     *
     * @param user the user to remove
     */
    public void removeUser(User user) {
        users.remove(user);
        List<Topic> userTopics = user.getTopics();
        userTopics.remove(this);
        user.setTopics(userTopics);
    }
}
