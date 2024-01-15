package com.bird.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bird.models.Image;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> { 
	
	Optional<Image> findByImageName(String imageName);

}
