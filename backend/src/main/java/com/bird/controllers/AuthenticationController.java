package com.bird.controllers;

import java.util.LinkedHashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bird.dto.FindUsernameDTO;
import com.bird.dto.PasswordCodeDTO;
import com.bird.exceptions.EmailAlreadyTakenException;
import com.bird.exceptions.EmailFailedToSendException;
import com.bird.exceptions.IncorrectVerificationCodeException;
import com.bird.exceptions.InvalidCredentialsException;
import com.bird.exceptions.UserDoesNotExistException;
import com.bird.models.ApplicationUser;
import com.bird.models.LoginResponse;
import com.bird.models.RegistrationObject;
import com.bird.services.MailService;
import com.bird.services.TokenService;
import com.bird.services.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

	private final UserService userService;
	private final TokenService tokenService;
	private final AuthenticationManager authenticationManager;
	private final MailService mailService;

	@Autowired
	public AuthenticationController(UserService userService, TokenService tokenService, AuthenticationManager authenticationManager, MailService mailService) {

		this.userService = userService;
		this.tokenService = tokenService;
		this.authenticationManager = authenticationManager;
		this.mailService = mailService;
	}

	@ExceptionHandler({ EmailAlreadyTakenException.class })
	public ResponseEntity<String> handleEmailTaken() {

		return new ResponseEntity<String>("The email you provided is already in use", HttpStatus.CONFLICT);
	}

	@PostMapping("/register")
	public ApplicationUser registerUser(@RequestBody RegistrationObject ro) {

		return userService.registerUser(ro);
	}

	@ExceptionHandler({ UserDoesNotExistException.class })
	public ResponseEntity<String> handleUserDoesntExist() {

		return new ResponseEntity<String>("The user you are looking for does not exist", HttpStatus.NOT_FOUND);
	}

	@PutMapping("/update/phone")
	public ApplicationUser updatePhoneNumber(@RequestBody LinkedHashMap<String, String> body) {

		String username = body.get("username");
		String phone = body.get("phone");

		ApplicationUser user = userService.getUserbyUsername(username);

		user.setPhone(phone);

		return userService.updateUser(user);
	}

	@ExceptionHandler({ EmailFailedToSendException.class })
	public ResponseEntity<String> handleFailedEmail() {

		return new ResponseEntity<String>("Email failed to send, try again in a moment",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping("/email/code")
	public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body) {

		userService.generateVerification(body.get("username"));

		return new ResponseEntity<String>("Verification code generated, email sent", HttpStatus.OK);
	}

	@ExceptionHandler({ IncorrectVerificationCodeException.class })

	private ResponseEntity<String> handleIncorrectCode() {

		return new ResponseEntity<String>("The code provided does not match the user's code", HttpStatus.CONFLICT);
	}

	@PostMapping("/email/verify")
	public ApplicationUser verifyEmail(@RequestBody LinkedHashMap<String, String> body) {

		System.out.println("finding error");

		Long code = Long.parseLong(body.get("code"));

		String username = body.get("username");

		return userService.verifyEmail(username, code);
	}

	@PutMapping("/update/password")
	public ApplicationUser updatePassword(@RequestBody LinkedHashMap<String, String> body) {

		String username = body.get("username");

		String password = body.get("password");

		return userService.setPassword(username, password);
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<String> handleInvalidCredentials(){
		
		return new ResponseEntity<String>("Invalid credentials", HttpStatus.FORBIDDEN);
	}
	
	@PostMapping("/login")
	public LoginResponse login(@RequestBody LinkedHashMap<String, String> body) throws InvalidCredentialsException{
		
		System.out.println(body.toString());
		
		String username = body.get("username");

		String password = body.get("password");
		
		try {
			
			Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			 
			String token = tokenService.generateToken(auth);
			
			return new LoginResponse(userService.getUserbyUsername(username), token);
			
		} catch (AuthenticationException e) {
			
			throw new InvalidCredentialsException();
			
		}
	}
	
	@PostMapping("/find")
	public ResponseEntity<String> verifyUsername(@RequestBody FindUsernameDTO credentail){
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.TEXT_PLAIN);
		
		String username = userService.verifyUsername(credentail);
		
		return new ResponseEntity<String>(username,HttpStatus.OK);
		
	}
	
	@PostMapping("/identifiers")
	public FindUsernameDTO findIdentifiers(@RequestBody FindUsernameDTO credential) {
		
		ApplicationUser user = userService.getUsersEmailAndPhone(credential);
		
		return new FindUsernameDTO(user.getEmail(), user.getPhone(), user.getUsername());		
	}
	
	@PostMapping("/password/code")
	public ResponseEntity<String> retrievePasswordCode(@RequestBody PasswordCodeDTO body) throws EmailFailedToSendException{
		
		String email = body.getEmail();
		int code = body.getCode();
		
		mailService.sendEmail(email, "Your password reset code", ""+code);
		
		
		return new ResponseEntity<String>("Code sendt successfully",HttpStatus.OK);
	}
	

}







































