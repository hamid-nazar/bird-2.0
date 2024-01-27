package com.bird.exceptions;

public class FollowException extends Exception {

	private static final long serialVersionUID = 1L;

	public FollowException() {
		super("Users cannot folllow themselves");
	}
}
