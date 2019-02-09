package com.sisolutions.security;

public interface ISecurityUserService {

    String validatePasswordResetToken(long id, String token);

}
