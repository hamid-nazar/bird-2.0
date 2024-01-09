package com.bird.services;

import java.io.ByteArrayOutputStream;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bird.exceptions.EmailFailedToSendException;
import com.google.api.services.gmail.Gmail;

@Service
public class MailService {

	private final Gmail gmail;

	@Autowired
	public MailService(Gmail gmail) {

		this.gmail = gmail;
	}

	public void sendEmail(String toAddress, String subject, String content) throws Exception {

		Properties props = new Properties();

		Session session = Session.getInstance(props, null);

		MimeMessage email = new MimeMessage(session);

		try {

			email.setFrom(new InternetAddress("onyforstudy66@gmail.com"));
			email.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(toAddress));
			email.setSubject(subject);
			email.setText(content);

			ByteArrayOutputStream buffer = new ByteArrayOutputStream();

			email.writeTo(buffer);

			byte[] rawMessageBytes = buffer.toByteArray();

			String encodedEmail = Base64.encodeBase64URLSafeString(rawMessageBytes);

			// String encodedEmail = Base64.getMimeEncoder().encodeToString(rawMessageByte);

			com.google.api.services.gmail.model.Message message = new com.google.api.services.gmail.model.Message();

			message.setRaw(encodedEmail);

			message = gmail.users().messages().send("me", message).execute();

		} catch (Exception e) {

			throw new EmailFailedToSendException();

		}

	}
}
