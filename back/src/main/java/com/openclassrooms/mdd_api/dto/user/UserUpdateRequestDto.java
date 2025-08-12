package com.openclassrooms.mdd_api.dto.user;

public record UserUpdateRequestDto(String username, String email, String password) {
}
