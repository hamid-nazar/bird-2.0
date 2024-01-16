package com.bird.services;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	private JwtEncoder jwtEncoder;
	private JwtDecoder jwtDecoder;

	@Autowired
	public TokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {

		this.jwtEncoder = jwtEncoder;
		this.jwtDecoder = jwtDecoder;
	}

	public String generateToken(Authentication auth) {

		Instant now = Instant.now();

		String scrope = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(" "));

		JwtClaimsSet claims = JwtClaimsSet.builder().issuer("self").issuedAt(now).subject(auth.getName())
				.claim("scope", scrope).build();

		return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

	public String getUsernameFromToken(String token) {
		
		 Jwt decoded = jwtDecoder.decode(token);
		 
		 String username = decoded.getSubject();
		 
		 return username;

	}

}