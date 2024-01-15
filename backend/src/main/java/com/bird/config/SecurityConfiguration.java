package com.bird.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
public class SecurityConfiguration {
	
	private final RSAKeyProperties keys;
	
	@Autowired
	public SecurityConfiguration(RSAKeyProperties keys) {
		
		this.keys = keys;
	}
	
	@Bean
	public PasswordEncoder passawordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authManager(UserDetailsService userDetailsService) {
		
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passawordEncoder());
		
		
		return new ProviderManager(provider);
	}
	
	@Bean
	 public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	
		return http
				.csrf(csrf -> csrf.disable())
				.authorizeRequests(auth -> auth
						.mvcMatchers("/auth/**").permitAll()
						.mvcMatchers("/images/**").permitAll()
						.anyRequest().authenticated()
				)
				.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.build();
				
	}
	
	@Bean
	JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
	}
	
	 @Bean
	 JwtEncoder jwtEncoder() {
		 JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
		 JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
		 return new NimbusJwtEncoder(jwks);
	 }

}
