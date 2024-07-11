package org.example.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {
    private Long id;
    private String header;
    private String body;
    private List<UserDto> likes;
    private List<UserDto> disLikes;
    private LocalDateTime createdDate;
    private UserDto author;
}
