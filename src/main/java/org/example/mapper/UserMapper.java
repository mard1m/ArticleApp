package org.example.mapper;

import org.example.dto.UserDto;
import org.example.model.Article;
import org.example.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Collectors;

public class UserMapper {
    public static User fromDtoReg(UserDto userDto) throws IOException {
        return User.builder()
                .photo(userDto.getPhoto().getBytes())
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .name(userDto.getName())
                .build();
    }
    public static UserDto toDto(User user) {
        return UserDto.builder()
                .username(user.getUsername())
                .id(user.getId())
                .role(user.getRole())
                .articleIds(user.getArticles().stream().map(Article::getId).collect(Collectors.toSet()))
                .photoBytes(user.getPhoto())
                .name(user.getName())
                .build();
    }
}
