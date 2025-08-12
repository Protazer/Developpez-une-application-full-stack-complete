package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.comment.GetCommentResponseDto;

import java.util.List;

public interface ICommentService {
    List<GetCommentResponseDto> getAllComments();

    GetCommentResponseDto getCommentById(int id);
}
