package com.bird.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bird.dto.CreatePostDTO;
import com.bird.exceptions.PostDoesNotExistException;
import com.bird.exceptions.UnableToCreatePostException;
import com.bird.models.ApplicationUser;
import com.bird.models.Post;
import com.bird.services.PostService;


@RestController
@RequestMapping("/posts")
public class PostController {
	
	private final PostService postService;
	
	
	
	@Autowired
	public PostController(PostService postService) {
		
		this.postService = postService;
		
	}
	
	
	@ExceptionHandler(UnableToCreatePostException.class)
	public ResponseEntity<String> unableToCreatePost(){
		
		return new ResponseEntity<String>("Unable to create a post at this time", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/")
	public Post createPost(@RequestBody CreatePostDTO dto) {
		
		return postService.createPost(dto);
	}
	
	@PostMapping(value = "/media", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public Post createMediaPost(@RequestPart("post") String post, @RequestPart("media") List<MultipartFile> files) {
	
		return postService.createMediaPost(post, files);
		
	}
	
	@GetMapping("/")
	public List<Post> getAllPosts() {
		System.out.println("Getting all the posts");
		return postService.getPosts();
	}
	
	@ExceptionHandler( PostDoesNotExistException.class)
	public ResponseEntity<String> handlePostDoesNotExist(){
		
		return new ResponseEntity<String>("The requested post does not exist", HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("id/{id}")
	public Post getPostById(@PathVariable Integer id) {
		
		return postService.getPostById(id);
	}
	
	
	@GetMapping("/author/{userId}")
	public Set<Post> getPostsByAuthor(@PathVariable Integer userId) {
		
		ApplicationUser author = new ApplicationUser();
		author.setUserId(userId);
		
		return postService.getAllPostsByAuthor(author);
	}
	
	@DeleteMapping("/")
	public ResponseEntity<String> deletePost(@RequestBody Post post){
		
		postService.deletePost(post);
		
		return new ResponseEntity<String>("Post has been deleted successfully", HttpStatus.OK);
	}
	

}
