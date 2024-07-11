package org.example.controllers.RestControllers;

import lombok.AllArgsConstructor;
import org.example.dto.ArticleDto;
import org.example.dto.UserDto;
import org.example.mapper.ArticleMapper;
import org.example.mapper.UserMapper;
import org.example.model.Article;
import org.example.model.User;
import org.example.services.ArticleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
@RequestMapping("/article-api")
public class ArticleRestController {
    private final ArticleService service;
    @GetMapping("/")
    public List<ArticleDto> getAllArticles() {
        return ArticleMapper.toDto(service.findAllArticles());
    }

    @GetMapping("/{id}")
    public ArticleDto getAllArticleById(@PathVariable Long id) {
        return ArticleMapper.toDto(service.findArticleById(id));
    }
    @PostMapping("/")
    public ArticleDto createArticle(@RequestBody Article article) {
        return ArticleMapper.toDto(service.createArticle(article));
    }
    @GetMapping("/like/{id}")
    public UserDto doLike(@PathVariable Long id) {
        return UserMapper.toDto(service.addLike(id, ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()));
    }
    @GetMapping("/unlike/{id}")
    public void undoLike(@PathVariable Long id) {
        service.removeLike(id, ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }
    @GetMapping("/dislike/{id}")
    public UserDto doDisLike(@PathVariable Long id) {
        return UserMapper.toDto(service.addDisLike(id, ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()));
    }
    @GetMapping("/undislike/{id}")
    public void undoDisLike(@PathVariable Long id) {
        service.removeDisLike(id, ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
    }
    @DeleteMapping("/{articleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteArticle(@PathVariable Long articleId) {
        service.deleteArticle(articleId);
    }
}
