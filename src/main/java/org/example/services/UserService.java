package org.example.services;

import lombok.AllArgsConstructor;
import org.example.model.Article;
import org.example.model.Role;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final ArticleService articleService;
    private final PasswordEncoder encoder;
    @Transactional
    public User createUser(User user) {
        user.setRole(Collections.singletonList(Role.USER));
        user.setIsActive(Boolean.TRUE);
        user.setPassword(encoder.encode(user.getPassword()));
        return repository.save(user);
    }
    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
        return repository.findAll();
    }
    @Transactional(readOnly = true)
    public User findUserById(long id) {
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }
    public User putUser(long id, User other) {
        User user = findUserById(id);
        user.setUsername(other.getUsername());
        user.setPassword(other.getPassword());
        return repository.save(user);
    }

    public User findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    public void deleteUser(long id) {
        repository.delete(findUserById(id));
    }
    public User addArticle(long userId, Article article) {
        User user = findUserById(userId);
        user.getArticles().add(article);
        article.setAuthor(user);
        articleService.createArticle(article);
        return repository.save(user);
    }
    public User addArticle(long userId, long articleId) {
        User user = findUserById(userId);
        user.getArticles().add(articleService.findArticleById(articleId));
        return repository.save(user);
    }
    public byte[] getPhoto(Long id) {
        return findUserById(id).getPhoto();
    }
}
