package com.bird;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bird.config.RSAKeyProperties;
import com.bird.models.ApplicationUser;
import com.bird.models.Role;
import com.bird.repositories.RoleRepository;
import com.bird.repositories.UserRepository;
import com.bird.services.UserService;

@SpringBootApplication
@EnableConfigurationProperties(RSAKeyProperties.class)
public class BirdBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BirdBackendApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run(RoleRepository roleRepo,UserRepository userRepository, PasswordEncoder encoder) {
		
		return (arg)->{
			
			Role r =  roleRepo.save(new Role(1,"USER"));
			
			Set<Role> roles = new HashSet<>();
			
			roles.add(r);
			ApplicationUser u = new ApplicationUser();
			u.setAuthorities(roles);
			u.setFirstName("unknown");
			u.setLastName("koder");
			u.setEmail("wasej69587@kkoup.com");
			u.setUsername("unknownkoder");
			u.setPhone("5555555555");
			u.setPassword(encoder.encode("password"));
			u.setEnabled(true);
			
			
			userRepository.save(u);
			
			
		};
	}

}
