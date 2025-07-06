package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	@NotNull
	@Size(max = 55)
	private String name;

	@NotNull
	@Size(max = 55)
	private String email;

	@NotNull
	@Size(max = 255)
	private String password;

	@NotNull
	@CreationTimestamp
	private LocalDate createdAt;

	@NotNull
	@UpdateTimestamp
	private LocalDate updateAt;
}
