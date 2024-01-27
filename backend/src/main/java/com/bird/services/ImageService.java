package com.bird.services;

import java.io.File;
import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bird.exceptions.UnableToResolvePhotoException;
import com.bird.exceptions.UnableToSavePhotoException;
import com.bird.models.Image;
import com.bird.repositories.ImageRepository;
import java.nio.file.Files;

@Service
@Transactional
public class ImageService {
	
	private final ImageRepository imageRepository;
	
	private static final File DIRECTORY = new File("/Users/hamidnazari/Desktop/Twitter/backend/img");
	
	private static final  String URL = "http://localhost:8000/images/";
	
	
	@Autowired
	public ImageService(ImageRepository imageRepository) {
		this.imageRepository = imageRepository;

	}
	
	public Image uploadImage(MultipartFile file, String prefix) throws UnableToSavePhotoException {
		
		try {
			String extension = "." + file.getContentType().split("/")[1];
			
			File img = File.createTempFile(prefix, extension,DIRECTORY);
			
			file.transferTo(img);
			
			String imageURL = URL + img.getName();
			
			Image i = new Image(img.getName(), file.getContentType(), img.getPath(), imageURL);
			
			Image saved = imageRepository.save(i);
			
			return saved;
			
		} catch (IOException e) {
			
			e.printStackTrace();
			
			throw new UnableToSavePhotoException();
		}
		
	}
	
	public byte[] downloadImage(String fileName) throws UnableToResolvePhotoException {
		
		try {
			Image image = imageRepository.findByImageName(fileName).get();
			
			String filePath = image.getImagePath();
			
			byte[] imageBytes = Files.readAllBytes(new File(filePath).toPath());
			
			return imageBytes;
			
		} catch (IOException e) {
			
			e.printStackTrace();
			
			throw new UnableToResolvePhotoException();
		}
	}
	
	public String getImageType(String fileName) {
		
		Image image = imageRepository.findByImageName(fileName).get();
		
		return image.getImageType();
		
	}

}
