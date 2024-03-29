package com.bird.repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bird.models.ApplicationUser;
import com.bird.models.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
	
	Optional<Set<Post>> findByAuthor(ApplicationUser author);

}
