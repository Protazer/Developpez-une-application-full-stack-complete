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
	@Size(max = 55)
	private String title;

	@Size(max = 55)
	private String content;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "topics")
	private List<User> users = new ArrayList<>();
}
