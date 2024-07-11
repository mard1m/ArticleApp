package org.example.services;

import lombok.AllArgsConstructor;
import org.example.model.Article;
import org.example.model.User;
import org.example.repository.ArticleRepository;
import org.example.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ArticleService {
    private final ArticleRepository repository;
    private final UserRepository userRepository;
    @Transactional
    public Article createArticle(Article article) {
        article.setCreatedDate(LocalDateTime.now());
        article.setAuthor(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        return repository.save(article);
    }
    @Transactional(readOnly = true)
    public List<Article> findAllArticles() {
        return repository.findAll();
    }
    @Transactional(readOnly = true)
    public Article findArticleById(long id) {
        return repository.findById(id).orElseGet(Article::new);
    }

    public List<Article> findAllArticlesWithUser(long userId) {
        return repository.findByAuthor_Id(userId);
    }

    public User addLike(long articleId, long userId) {
        Article article = findArticleById(articleId);
        User user = userRepository.findById(userId).orElseThrow();

        article.getLikes().add(user);
        repository.save(article);
        return user;
    }
    public void removeLike(long articleId, long userId) {
        Article article = findArticleById(articleId);
        User user = userRepository.findById(userId).orElseThrow();

        article.getLikes().remove(user);
        repository.save(article);
    }
    public User addDisLike(long articleId, long userId) {
        Article article = findArticleById(articleId);
        User user = userRepository.findById(userId).orElseThrow();

        article.getDisLikes().add(user);
        repository.save(article);
        return user;
    }
    public void removeDisLike(long articleId, long userId) {
        Article article = findArticleById(articleId);
        User user = userRepository.findById(userId).orElseThrow();

        article.getDisLikes().remove(user);
        repository.save(article);
    }
    public void deleteArticle(long id) {
        repository.delete(findArticleById(id));
    }
}
