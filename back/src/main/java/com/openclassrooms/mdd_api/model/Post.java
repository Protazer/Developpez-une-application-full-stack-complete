package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Post entity represents a blog post or article.
 */
@Data
@Entity
@Table(name = "post")
public class Post {

    /**
     * Unique id of the post (primary key).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    /**
     * Title of the post, max 255 characters.
     */
    @NotNull
    @Size(max = 255)
    private String title;

    /**
     * Content text of the post, max 2000 characters.
     */
    @NotNull
    @Size(max = 2000)
    private String content;

    /**
     * The user who wrote the post.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User author;

    /**
     * List of comments linked to this post.
     * Cascade means comments are saved or deleted with the post.
     */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private List<Comment> comments = new ArrayList<>();

    /**
     * Topic related to this post.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "topic_id")
    private Topic topic;

    /**
     * Date when the post was created.
     * Automatically set by Hibernate.
     */
    @CreationTimestamp
    private LocalDate createdAt;

    /**
     * Date when the post was last updated.
     * Automatically updated by Hibernate.
     */
    @UpdateTimestamp
    private LocalDate updatedAt;

    /**
     * Add a comment to the post.
     *
     * @param comment comment to add
     */
    public void addComment(Comment comment) {
        comments.add(comment);
    }
}
