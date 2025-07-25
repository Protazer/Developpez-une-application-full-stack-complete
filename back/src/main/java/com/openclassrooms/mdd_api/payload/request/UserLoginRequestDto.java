package com.openclassrooms.mdd_api.payload.request;

import jakarta.validation.constraints.NotEmpty;

public record UserLoginRequestDto(@NotEmpty(message = "E-mail or username is mandatory !") String name,
                                  @NotEmpty(message = "Password is mandatory ") String password) {
}
