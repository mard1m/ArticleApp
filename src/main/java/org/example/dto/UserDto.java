package org.example.dto;

import lombok.*;
import org.example.model.Role;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String password;
    private Boolean isActive;
    private Set<Long> articleIds;
    private MultipartFile photo;
    private byte[] photoBytes;
    private List<Role> role;
}
