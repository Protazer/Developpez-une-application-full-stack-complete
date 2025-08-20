package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

/**
 * Comment entity represents a user comment in the database.
 */
@Data
@Entity
@Table(name = "comment")
public class Comment {

    /**
     * The unique id of the comment (primary key).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int comment_id;

    /**
     * Content text of the comment, max 2000 characters.
     */
    @NotNull
    @Size(max = 2000)
    private String content;

    /**
     * The user who wrote the comment.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Date when the comment was created.
     * Automatically set by Hibernate.
     */
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDate createdAt;

    /**
     * Date when the comment was last updated.
     * Automatically updated by Hibernate.
     */
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDate updatedAt;
}
