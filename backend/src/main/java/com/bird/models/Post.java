package com.bird.models;


import java.util.Date;
import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name = "posts")
public class Post {
	
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	@Column(name = "post_id")
	private Integer PostId;
	
	@Column(length = 256, nullable = false)
	private String content;
	
	@Column(name = "posted_date")
	private Date posteDate;
	
	@ManyToOne
	@JoinColumn(name = "author_id", nullable = false)
	private ApplicationUser author;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "post_like_junction",
		joinColumns = @JoinColumn(name = "post_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id" ))
	private Set<ApplicationUser> likes;
	
	
	@OneToMany
	private List<Image> images;

	//TODO: figure out video upload
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "post_reply_junction",
			joinColumns = @JoinColumn(name="post_id"),
			inverseJoinColumns = @JoinColumn(name="reply_id"))
	@JsonIgnore
	private Set<Post> replies;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "post_repost_junction",
			joinColumns = @JoinColumn(name="post_id"),
			inverseJoinColumns = @JoinColumn(name="user_id"))
	private Set<ApplicationUser> reposts;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "post_bookmark_junction",
			joinColumns = @JoinColumn(name="post_id"),
			inverseJoinColumns = @JoinColumn(name="user_id"))
	private Set<ApplicationUser> bookmarks;
	
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "post_view_junction",
			joinColumns = @JoinColumn(name="post_id"),
			inverseJoinColumns = @JoinColumn(name="user_id"))
	private Set<ApplicationUser> views;
	
	
	private Boolean scheduled;
	
	@Column(name = "scheduled_date", nullable = true)
	private Date scheduleDate;
	
	
	
	@Enumerated(EnumType.ORDINAL)
	private Audience audience;
	
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "reply_restriction")
	private ReplyRestriction replyRestriction;
	
	
	public Post() {
		this.likes = new HashSet<>();
		this.images = new ArrayList<>();
		this.replies = new HashSet<>();
		this.reposts = new HashSet<>();
		this.bookmarks = new HashSet<>();
		this.views = new HashSet<>();
		}


	public Post(Integer postId, String content, Date posteDate, ApplicationUser author, Set<ApplicationUser> likes,
			List<Image> images, Set<Post> replies, Set<ApplicationUser> reposts, Set<ApplicationUser> bookmarks,
			Set<ApplicationUser> views, Boolean scheduled, Date scheduleDate, Audience audience,
			ReplyRestriction replyRestriction) {
		super();
		PostId = postId;
		this.content = content;
		this.posteDate = posteDate;
		this.author = author;
		this.likes = likes;
		this.images = images;
		this.replies = replies;
		this.reposts = reposts;
		this.bookmarks = bookmarks;
		this.views = views;
		this.scheduled = scheduled;
		this.scheduleDate = scheduleDate;
		this.audience = audience;
		this.replyRestriction = replyRestriction;
	}


	public Integer getPostId() {
		return PostId;
	}


	public void setPostId(Integer postId) {
		PostId = postId;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public Date getPosteDate() {
		return posteDate;
	}


	public void setPosteDate(Date posteDate) {
		this.posteDate = posteDate;
	}


	public ApplicationUser getAuthor() {
		return author;
	}


	public void setAuthor(ApplicationUser author) {
		this.author = author;
	}


	public Set<ApplicationUser> getLikes() {
		return likes;
	}


	public void setLikes(Set<ApplicationUser> likes) {
		this.likes = likes;
	}


	public List<Image> getImages() {
		return images;
	}


	public void setImages(List<Image> images) {
		this.images = images;
	}


	public Set<Post> getReplies() {
		return replies;
	}


	public void setReplies(Set<Post> replies) {
		this.replies = replies;
	}


	public Set<ApplicationUser> getReposts() {
		return reposts;
	}


	public void setReposts(Set<ApplicationUser> reposts) {
		this.reposts = reposts;
	}


	public Set<ApplicationUser> getBookmarks() {
		return bookmarks;
	}


	public void setBookmarks(Set<ApplicationUser> bookmarks) {
		this.bookmarks = bookmarks;
	}


	public Set<ApplicationUser> getViews() {
		return views;
	}


	public void setViews(Set<ApplicationUser> views) {
		this.views = views;
	}


	public Boolean getScheduled() {
		return scheduled;
	}


	public void setScheduled(Boolean scheduled) {
		this.scheduled = scheduled;
	}


	public Date getScheduleDate() {
		return scheduleDate;
	}


	public void setScheduleDate(Date scheduleDate) {
		this.scheduleDate = scheduleDate;
	}


	public Audience getAudience() {
		return audience;
	}


	public void setAudience(Audience audience) {
		this.audience = audience;
	}


	public ReplyRestriction getReplyRestriction() {
		return replyRestriction;
	}


	public void setReplyRestriction(ReplyRestriction replyRestriction) {
		this.replyRestriction = replyRestriction;
	}


	@Override
	public String toString() {
		return "Post [PostId=" + PostId + ", content=" + content + ", posteDate=" + posteDate + ", author=" + author
				+ ", likes=" + likes + ", images=" + images + ", replies=" + replies + ", reposts=" + reposts
				+ ", bookmarks=" + bookmarks + ", views=" + views + ", scheduled=" + scheduled + ", scheduleDate="
				+ scheduleDate + ", audience=" + audience + ", replyRestriction=" + replyRestriction + "]";
	}
	
}
