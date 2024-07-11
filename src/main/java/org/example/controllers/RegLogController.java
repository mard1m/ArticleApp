package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.dto.UserDto;
import org.example.mapper.UserMapper;
import org.example.model.User;
import org.example.services.UserService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@AllArgsConstructor
public class RegLogController {
    private final UserService service;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/")
    public String main() {
        return "greeting";
    }

    @PostMapping("/login")
    public String doLogin(User user, Model model) {
        if(service.findUserByUsername((user.getUsername())) != null){
            model.addAttribute("error", new ErrorResponseDTO("User with such username does not exists"));
            return "login";
        }
        return "redirect:/";
    }

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("user", new UserDto());
        return "registration";
    }

    @PostMapping(value = "/registration", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String processRegistration(@ModelAttribute UserDto user, @RequestParam("photo") MultipartFile photo, Model model) {
        if(service.findUserByUsername((user.getUsername())) != null){
            model.addAttribute("error", new ErrorResponseDTO("Such user already exists"));
            return "registration";
        }

        if (!photo.isEmpty()) {
            try {
                user.setPhoto(photo);
                service.createUser(UserMapper.fromDtoReg(user));
            } catch (IOException e) {
                System.err.println("exception: " + e);
            }
        }

        return "redirect:/main/";
    }
}
