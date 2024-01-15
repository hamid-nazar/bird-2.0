package com.bird.models;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
public class ApplicationUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer userId;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(unique = true)
	private String email;

	private String phone;
	
	
	@Column(name = "dob")
	private Date dateOfBirth;
	
	@Column(unique = true)
	private String username;
	
	@JsonIgnore
	private String password;
	
	
	private String bio;
	
	private String nickname;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_picture", referencedColumnName = "image_id")
	private Image profilePicture;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "banner_picture", referencedColumnName = "image_id")
	private Image bannerPicture;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "following",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "following_id")
			)
	@JsonIgnore
	private Set<ApplicationUser> following;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "followers",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "follower_id")
			)
	@JsonIgnore
	private Set<ApplicationUser> followers;
	
	
//	Security related stuff
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "user_role_junction",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	
	
	private Set<Role> authorities;
	
	
	
	private Boolean enabled;
	
	@Column(nullable = true)
	@JsonIgnore
	private Long verfication;
	
	
	
	public ApplicationUser() {
		
		authorities = new HashSet<Role>();
		following = new HashSet<>();
		followers = new HashSet<>();
		this.enabled = false;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<Role> authorities) {
		this.authorities = authorities;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Long getVerfication() {
		return verfication;
	}

	public void setVerfication(Long verfication) {
		this.verfication = verfication;
	}
	
	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Image getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(Image profilePicture) {
		this.profilePicture = profilePicture;
	}

	public Image getBannerPicture() {
		return bannerPicture;
	}

	public void setBannerPicture(Image bannerPicture) {
		this.bannerPicture = bannerPicture;
	}

	public Set<ApplicationUser> getFollowing() {
		return following;
	}

	public void setFollowing(Set<ApplicationUser> following) {
		this.following = following;
	}

	public Set<ApplicationUser> getFollowers() {
		return followers;
	}

	public void setFollowers(Set<ApplicationUser> followers) {
		this.followers = followers;
	}

	@Override
	public String toString() {
		return "ApplicationUser [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", phone=" + phone + ", dateOfBirth=" + dateOfBirth + ", username=" + username + ", password="
				+ password + ", bio=" + bio + ", nickname=" + nickname + ", profilePicture=" + profilePicture
				+ ", bannerPicture=" + bannerPicture + ", following=" + following.size() + ", followers=" + followers.size()
				+ ", authorities=" + authorities + ", enabled=" + enabled + ", verfication=" + verfication + "]";
	}
	

}
