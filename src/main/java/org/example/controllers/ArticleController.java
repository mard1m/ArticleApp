package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.mapper.ArticleMapper;
import org.example.model.Article;
import org.example.model.User;
import org.example.services.ArticleService;
import org.example.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RequestMapping("/main")
public class ArticleController {
    public ArticleService articleService;
    private final UserService userService;

    @GetMapping("/")
    public String getAllArticles(Model model) {
        model.addAttribute("articles", ArticleMapper.toDto(articleService.findAllArticles()));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        model.addAttribute("currentUserId", userDetails.getId());
        return "main-page";
    }
    @GetMapping("/{id}")
    public String getAllArticlesWithUser(Model model, @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        model.addAttribute("user", userDetails);
        model.addAttribute("currentUserId", id);
        model.addAttribute("articles", ArticleMapper.toDto(articleService.findAllArticlesWithUser(id)));
        return "personal-user-articles";
    }

    @GetMapping("/create")
    public String createNewArticle(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Long id = userDetails.getId();
        model.addAttribute("userId", id);
        return "article-builder";
    }
    @PostMapping("/add")
    public String addArticle(@RequestParam long userId, @ModelAttribute Article article) {
        userService.addArticle(userId, article);
        return "redirect:../main/";
    }
    @PostMapping("/delete/{id}")
    public String deleteArticle(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Long userId = userDetails.getId();
        articleService.deleteArticle(id);
        return "redirect:../" + userId;
    }

    @PostMapping("/like/{articleId}")
    public String likeArticle(@PathVariable Long articleId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        Long userId = userDetails.getId();
        articleService.addLike(articleId, userId);
        return "redirect:../../main/";
    }
}
