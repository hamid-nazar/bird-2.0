package com.bird.controllers;

import java.util.LinkedHashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bird.exceptions.FollowException;
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
	
		String username = tokenService.getUsernameFromToken(token);
		
		return userService.getUserbyUsername(username);
	}
	
	@ExceptionHandler({UnableToSavePhotoException.class, UnableToResolvePhotoException.class})
	public ResponseEntity<String> handlePhotoExceptions(){
		
		return new ResponseEntity<String>("Unable to process the photo", HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	@PostMapping("/pfp")
	public ApplicationUser uploadProfilePicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestParam("image") MultipartFile file) throws UnableToSavePhotoException{
		
		String username	= tokenService.getUsernameFromToken(token);
		
		return userService.setBannerOrProfilePicture(username, file, "pfp");
	}
	
	
	@PostMapping("/banner")
	public ApplicationUser uploadBannerPicture(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestParam("image") MultipartFile file) throws UnableToSavePhotoException{
		
		String username	= tokenService.getUsernameFromToken(token);
		
		return userService.setBannerOrProfilePicture(username, file, "bnr");
	}
	
	
	@PutMapping("/")
	public ApplicationUser updateUser(@RequestBody ApplicationUser user) {
		
		return userService.updateUser(user);
	}
	
	@ExceptionHandler(FollowException.class)
	public ResponseEntity<String> handleFollowException(){
		
		return new ResponseEntity<String>("User cannot follow themselves", HttpStatus.FORBIDDEN);
	}
	
	@PutMapping("/follow")
	public Set<ApplicationUser> followUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody LinkedHashMap<String, String> body) throws FollowException{
		
		String LoggedInUserUsername = tokenService.getUsernameFromToken(token);
		
		String followedUserUsername = body.get("followedUser");
		
		return userService.followerUser(LoggedInUserUsername, followedUserUsername);
	}
	
	@GetMapping("/following/{username}")
	public Set<ApplicationUser> getFollowingList(@PathVariable("username") String username){
		
		return userService.retrieveFollowingList(username);
	}
	
	@GetMapping("/followers/{username}")
	public Set<ApplicationUser> getFollowersList(@PathVariable("username") String username){
		
		return userService.retrieveFollowersList(username);
	}
}
