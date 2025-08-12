package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.comment.GetCommentResponseDto;
import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.mapper.CommentMapper;
import com.openclassrooms.mdd_api.model.Comment;
import com.openclassrooms.mdd_api.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    private CommentService(final CommentRepository commentRepository, final CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    @Override
    public List<GetCommentResponseDto> getAllComments() {
        return commentRepository.findAll().stream().map(this.commentMapper::toGetCommentResponseDto).toList();
    }

    @Override
    public GetCommentResponseDto getCommentById(int id) {
        Optional<Comment> comment = this.commentRepository.findById(id);
        if (comment.isPresent()) {
            return this.commentMapper.toGetCommentResponseDto(comment.get());
        } else {
            throw new ApiException("Commentaire non trouvé");
        }
    }
}
