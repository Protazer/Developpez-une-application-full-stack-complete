package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int topicId;

    @NotNull
    @Size(max = 255)
    private String title;

    @Size(max = 2000)
    private String content;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "topics")
    private List<User> users = new ArrayList<>();

    public void addUser(User user) {
        users.add(user);
        List<Topic> userTopics = user.getTopics();
        userTopics.add(this);
        user.setTopics(userTopics);
    }

    public void removeUser(User user) {
        users.remove(user);
        List<Topic> userTopics = user.getTopics();
        userTopics.remove(this);
        user.setTopics(userTopics);
    }
}
