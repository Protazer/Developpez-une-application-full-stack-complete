package com.openclassrooms.mdd_api.payload.request;

public record UserUpdateRequestDto(String username, String email, String password) {
}
