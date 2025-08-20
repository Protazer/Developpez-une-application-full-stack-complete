package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * User entity represents a user in the system.
 */
@Data
@Entity
@Table(name = "user")
@DynamicUpdate
public class User {

    /**
     * Unique id of the user (primary key).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    /**
     * Name of the user, max 255 characters.
     */
    @NotNull
    @Size(max = 255)
    private String name;

    /**
     * Email of the user, max 255 characters.
     */
    @NotNull
    @Size(max = 255)
    private String email;

    /**
     * Encrypted password of the user, max 255 characters.
     */
    @NotNull
    @Size(max = 255)
    private String password;

    /**
     * List of topics the user follows or is interested in.
     * Many-to-many relation with Topic.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_topic",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")
    )
    private List<Topic> topics = new ArrayList<>();

    /**
     * Date when the user was created.
     * Automatically set by Hibernate.
     */
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDate createdAt;

    /**
     * Date when the user was last updated.
     * Automatically updated by Hibernate.
     */
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDate updatedAt;
}
