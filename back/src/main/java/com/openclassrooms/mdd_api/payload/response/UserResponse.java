package com.openclassrooms.mdd_api.payload.response;


import com.openclassrooms.mdd_api.model.Topic;

import java.time.LocalDate;
import java.util.List;

public record UserResponse(int id, String name, String email, LocalDate created_at,
                           LocalDate updated_at, List<Topic> topics) {
}
