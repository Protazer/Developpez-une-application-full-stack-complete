package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "comment")

public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int comment_id;

	@NotNull
	@Size(max = 255)
	private String content;

	@CreationTimestamp
	private Date createdAt;

	@UpdateTimestamp
	private Date updatedAt;
}
