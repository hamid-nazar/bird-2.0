package com.bird.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bird.exceptions.UnableToResolvePhotoException;
import com.bird.exceptions.UnableToSavePhotoException;
import com.bird.models.ApplicationUser;
import com.bird.services.ImageService;
import com.bird.services.TokenService;
import com.bird.services.UserService;
import com.google.common.net.HttpHeaders;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	private final UserService userService;
	private final TokenService tokenService;
	private final ImageService imageService;
	

	@Autowired
	public UserController(UserService userService, TokenService tokenService, ImageService imageService) {
		this.userService = userService;
		this.tokenService = tokenService;
		this.imageService = imageService;
	}
	
	@GetMapping("/verify")
	public ApplicationUser verifyIdentity(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
	
		String username = "";
		ApplicationUser user;
		
		if (token.substring(0,6).equals("Bearer")) {
			
			String stripedToken = token.substring(7);
			username =  tokenService.getUsernameFromToken(stripedToken);	
		}
		try {
			
			user = userService.getUserbyUsername(username);
			
		} catch (Exception e) {
			
			user = null;
		}
		
		return user;
		
	}
	
	@ExceptionHandler({UnableToSavePhotoException.class, UnableToResolvePhotoException.class})
	public ResponseEntity<String> handlePhotoExceptions(){
		
		return new ResponseEntity<String>("Unable to process the photo", HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	@PostMapping("/pfp")
	public ResponseEntity<String> uploadProfilePicture(@RequestParam("image") MultipartFile file) throws UnableToSavePhotoException{
		
		String uploadImage = imageService.uploadImage(file, "pfp");
		
		return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
	}
	
	
}
