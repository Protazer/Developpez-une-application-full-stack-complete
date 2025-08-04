package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.exception.ApiException;
import com.openclassrooms.mdd_api.mapper.TopicMapper;
import com.openclassrooms.mdd_api.mapper.UserMapper;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.payload.request.UserLoginRequestDto;
import com.openclassrooms.mdd_api.payload.request.UserRegisterDto;
import com.openclassrooms.mdd_api.payload.request.UserUpdateRequestDto;
import com.openclassrooms.mdd_api.payload.response.GetUserResponseDto;
import com.openclassrooms.mdd_api.payload.response.UserAuthResponseDto;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private UserService(final UserRepository userRepository, UserMapper userMapper, JWTService jwtService, BCryptPasswordEncoder bCryptPasswordEncoder, TopicMapper topicMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ApiException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void deleteUser(int id) {
        Optional<User> foundedUser = this.userRepository.findById(id);
        if (foundedUser.isPresent()) {
            this.userRepository.delete(foundedUser.get());
        } else {
            throw new ApiException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public UserAuthResponseDto registerUser(final UserRegisterDto user) {
        Optional<User> emailExist = this.userRepository.findByEmail(user.email());
        Optional<User> nameExist = this.userRepository.findByName(user.name());
        if (emailExist.isPresent()) {
            throw new ApiException("User email Already exist", HttpStatus.BAD_REQUEST);
        }
        if (nameExist.isPresent()) {
            throw new ApiException("UserName Already exist", HttpStatus.BAD_REQUEST);
        }
        User newUser = this.userMapper.UserRegisterToEntity(user);
        this.userRepository.save(newUser);
        String token = this.jwtService.generateToken(newUser);
        return new UserAuthResponseDto(token);
    }

    @Override
    public UserAuthResponseDto loginUser(final UserLoginRequestDto user) {
        Optional<User> findUser = this.userRepository.findByNameOrEmail(user.name(), user.name());
        if (findUser.isEmpty()) {
            throw new ApiException("Email or username not found", HttpStatus.UNAUTHORIZED);
        }
        boolean isLoginCorrect = this.bCryptPasswordEncoder.matches(user.password(), findUser.get().getPassword());
        if (!isLoginCorrect) {
            throw new ApiException("Email/Username/Password invalid", HttpStatus.UNAUTHORIZED);
        }
        String token = this.jwtService.generateToken(findUser.get());
        return new UserAuthResponseDto(token);
    }

    @Override
    public GetUserResponseDto getUser(final JwtAuthenticationToken token) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> user = this.userRepository.findById(userId);
        if (user.isPresent()) {
            return this.userMapper.toDto(user.get());
        } else {
            throw new ApiException("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public GetUserResponseDto updateUser(final JwtAuthenticationToken token, final UserUpdateRequestDto user) {
        int userId = Integer.parseInt(token.getToken().getSubject());
        Optional<User> foundUser = this.userRepository.findById(userId);
        if (foundUser.isPresent()) {
            User emailAlreadyExist = this.userRepository.findByEmail(user.email()).orElse(null);
            User nameAlreadyExist = this.userRepository.findByName(user.username()).orElse(null);

            if (!Objects.equals(foundUser.get().getEmail(), user.email()) && emailAlreadyExist != null) {
                throw new ApiException("Email already in use", HttpStatus.BAD_REQUEST);
            }
            if (!Objects.equals(foundUser.get().getName(), user.username()) && nameAlreadyExist != null) {
                throw new ApiException("Name already in use", HttpStatus.BAD_REQUEST);
            }
            User updatedUser = this.userMapper.toUpdatedUser(foundUser.get(), user);
            this.userRepository.save(updatedUser);
            return this.userMapper.toDto(updatedUser);
        } else {
            throw new ApiException("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
