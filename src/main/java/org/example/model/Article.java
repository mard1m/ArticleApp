package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity(name = "articles")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = Integer.MAX_VALUE)
    private String header;
    @Column(length = Integer.MAX_VALUE)
    private String body;
    private LocalDateTime createdDate;
    @ManyToMany
    private Set<User> likes;
    @ManyToMany
    private Set<User> disLikes;
    @ManyToOne
    @JsonIgnore
    private User author;
}
