package com.bird.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bird.exceptions.UnableToResolvePhotoException;
import com.bird.services.ImageService;

@RestController
@RequestMapping("/images")
@CrossOrigin("*")
public class ImageController {
	
	private final ImageService imageService;
	
	@Autowired
	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}
	
	
	@GetMapping("/{fileName}")
	public ResponseEntity<byte[]> downloadImage(@PathVariable String fileName) throws UnableToResolvePhotoException{
		
		byte[] imageBytes = imageService.downloadImage(fileName);
		
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf(imageService.getImageType(fileName)))
				.body(imageBytes);
	}

}
