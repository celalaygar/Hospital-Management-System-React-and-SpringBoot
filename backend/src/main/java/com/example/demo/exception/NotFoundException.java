package com.example.demo.exception;

/**
 * Created by IntelliJ IDEA.
 * Project : Hospital-Management-System-React-and-SpringBoot
 * User: hendisantika
 * Link: s.id/hendisantika
 * Email: hendisantika@yahoo.co.id
 * Telegram : @hendisantika34
 * Date: 05/02/25
 * Time: 18.58
 * To change this template use File | Settings | File Templates.
 */
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
