package com.bird.services;

import java.sql.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bird.exceptions.EmailAlreadyTakenException;
import com.bird.exceptions.EmailFailedToSendException;
import com.bird.exceptions.IncorrectVerificationCodeException;
import com.bird.exceptions.UserDoesNotExistException;
import com.bird.models.ApplicationUser;
import com.bird.models.RegistrationObject;
import com.bird.models.Role;
import com.bird.repositories.RoleRepository;
import com.bird.repositories.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userRepo;
	private final RoleRepository roleRepo;
	private MailService mailService;
	private final PasswordEncoder passwordEncoder;
	

	@Autowired
	public UserService(UserRepository userRepo, RoleRepository roleRepo, MailService mailService, PasswordEncoder passwordEncoder) {
		
		this.userRepo = userRepo;
		this.roleRepo = roleRepo;
		this.mailService = mailService;
		this.passwordEncoder = passwordEncoder;
	}
	
	
	

	public ApplicationUser getUserbyUsername(String username) {
		
		return userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
	}


	public ApplicationUser updateUser(ApplicationUser user) {
		
		try {
			return userRepo.save(user);
			
		} catch (Exception e) {
			
			throw new EmailAlreadyTakenException();
		}
		
	}
	
	
	
	
	
	
	public ApplicationUser registerUser(RegistrationObject ro) {
		
		ApplicationUser user = new ApplicationUser();
		
		user.setFirstName(ro.getFirstName());
		user.setLastName(ro.getLastName());
		user.setEmail(ro.getEmail());
		
		String dateString = ro.getDob();
		Date sqlDate = java.sql.Date.valueOf(dateString);
		
		user.setDateOfBirth(sqlDate);
		
		String name = user.getFirstName() + user.getLastName();
		
		boolean nameTaken = true;
		
		String tempName = "";
		
		while (nameTaken) {
			
			tempName = generateUsername(name);
			
			if (userRepo.findByUsername(tempName).isEmpty()) {
				
				nameTaken = false;
			}
		}
		
		
		user.setUsername(tempName);
		
		
		Set<Role> roles = user.getAuthorities();
		
		roles.add(roleRepo.findByAuthority("USER").get());
		
		user.setAuthorities(roles); 
		
		try {
			return userRepo.save(user);
			
		} catch (Exception e) {
			
			throw new EmailAlreadyTakenException();
		}
		

	}

	

	public void generateVerification(String username) {
		
		ApplicationUser user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
		
		user.setVerfication(generateVerificationNumber());
		
		try {
			mailService.sendEmail(user.getEmail(),"Your verification code", "Here is your verification code: "+ user.getVerfication());
			
			userRepo.save(user);
			
		} catch (Exception e) {
			
			throw new EmailFailedToSendException();
		}
		
		
		
		
	}
	
	
	public ApplicationUser verifyEmail(String username, Long code) {
		
		ApplicationUser user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
		
		if (code.equals(user.getVerfication())) {
			
			user.setEnabled(true);
			user.setVerfication(null);
			
			return userRepo.save(user);
			
		} else {
			
			throw new IncorrectVerificationCodeException();
		}

		
		
	}


	public ApplicationUser setPassword(String username, String password) {
		
		ApplicationUser user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

		String encodedPassword = passwordEncoder.encode(password);
		
		user.setPassword(encodedPassword);
		
		

		return userRepo.save(user);
	}


	private String generateUsername(String username) {
		
		long generatedNumber = (long)Math.floor(Math.random()*1_000_000_000);
		
		return username + generatedNumber;
	}

	
	private Long generateVerificationNumber() {
		long generatedNumber = (long)Math.floor(Math.random()*1_00_000_000);
		
		return generatedNumber;
	}













	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
