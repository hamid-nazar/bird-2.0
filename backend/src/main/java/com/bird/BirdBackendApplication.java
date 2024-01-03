package com.bird;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.bird.models.Role;
import com.bird.repositories.RoleRepository;

@SpringBootApplication
public class BirdBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BirdBackendApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run(RoleRepository roleRepo) {
		return Args->{
			
			roleRepo.save(new Role(1,"USER"));
		};
	}

}
