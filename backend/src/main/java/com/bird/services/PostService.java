package com.bird.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bird.dto.CreatePostDTO;
import com.bird.exceptions.PostDoesNotExistException;
import com.bird.exceptions.UnableToCreatePostException;
import com.bird.models.ApplicationUser;
import com.bird.models.Image;
import com.bird.models.Post;
import com.bird.repositories.PostRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class PostService {
	
	private final PostRepository postRepo;
	private final ImageService imageService;
	
	
	@Autowired
	public PostService(PostRepository postRepo, ImageService imageService) {
		
		this.postRepo = postRepo;
		this.imageService = imageService;

	}
	

	
	public Post createPost(CreatePostDTO dto) {
		
		Post post = new Post();
		
		post.setContent(dto.getContent());
		
		if (dto.getScheduled()) {
			
			post.setPosteDate(dto.getScheduledDate());
		} else {
			post.setPosteDate(new Date());
		}
		
		post.setAuthor(dto.getAuthor());
		post.setReplies(dto.getReplies());
		post.setScheduled(dto.getScheduled());
		post.setScheduleDate(dto.getScheduledDate());
		post.setAudience(dto.getAudience());
		post.setReplies(dto.getReplies());
		post.setReplyRestriction(dto.getReplyRestriction());
		
		try {
			
			Post posted = postRepo.save(post);
			
			return posted;
			
		} catch (Exception e) {
			
			throw new UnableToCreatePostException();
		}
	}
	
	
	public Post createMediaPost(String post, List<MultipartFile> files) {
		
		CreatePostDTO dto = new CreatePostDTO();
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			dto = mapper.readValue(post, CreatePostDTO.class);
			
			Post p = new Post();
			
			p.setContent(dto.getContent());
			
			if (dto.getScheduled()) {
				
				p.setPosteDate(dto.getScheduledDate());
				
			} else {
				
				p.setPosteDate(new Date());
			}
			
			p.setAuthor(dto.getAuthor());
			p.setReplies(dto.getReplies());
			p.setScheduled(dto.getScheduled());
			p.setScheduleDate(dto.getScheduledDate());
			p.setAudience(dto.getAudience());
			p.setReplies(dto.getReplies());
			p.setReplyRestriction(dto.getReplyRestriction());
			
			
			// upload the images that got passed
			
			List<Image> postImages = new ArrayList<>();
			
			
			for (int i = 0; i < files.size(); i++) {
				
				Image postImage = imageService.uploadImage(files.get(i), "post");
				postImages.add(postImage);
			}
			
			p.setImages(postImages);
			
			return postRepo.save(p);
			
		} catch (Exception e) {
			
			throw new UnableToCreatePostException();
		}
		
	}
	
	
	public List<Post> getPosts() {
		
		return postRepo.findAll();
		
	}
	
	
	
	public Post getPostById(Integer id) {
		// TODO: set up costum exceptionf for posts dont exist
		
		return postRepo.findById(id).orElseThrow(() -> new PostDoesNotExistException());
				
	
	}
	
	
	public Set<Post> getAllPostsByAuthor(ApplicationUser author) {
		
		Set<Post> userPosts = postRepo.findByAuthor(author).orElse(new HashSet<>());
		
		return userPosts;
	}
	
	public void deletePost(Post post) {
		
		postRepo.delete(post);
	}

}
