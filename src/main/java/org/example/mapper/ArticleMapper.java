package org.example.mapper;

import org.example.dto.ArticleDto;
import org.example.dto.UserDto;
import org.example.model.Article;
import org.example.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    static ArticleDto toDto(Article article) {
        if ( article == null ) {
            return null;
        }

        ArticleDto articleDto = new ArticleDto();
        articleDto.setHeader(article.getHeader());

        return ArticleDto.builder()
                .id(article.getId())
                .body(article.getBody())
                .header(article.getHeader())
                .author(userToUserDto(article.getAuthor()))
                .likes(userToUserDto(article.getLikes()))
                .disLikes(userToUserDto(article.getDisLikes()))
                .createdDate(article.getCreatedDate())
                .build();
    }

    private static UserDto userToUserDto(User user) {
        if(user == null) {
            return null;
        }
        return UserDto.builder()
                .id(user.getId())
                .role(user.getRole())
                .name(user.getName())
                .isActive(true)
                .username(user.getUsername())
                .photoBytes(user.getPhoto())
                .articleIds(user.getArticles().stream().map(Article::getId).collect(Collectors.toSet()))
                .build();
    }
    static List<UserDto> userToUserDto(Set<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( users.size() );
        for ( User user : users ) {
            list.add( userToUserDto( user ) );
        }

        return list;
    }
    static List<ArticleDto> toDto(List<Article> article) {
        if ( article == null ) {
            return null;
        }

        List<ArticleDto> list = new ArrayList<ArticleDto>( article.size() );
        for ( Article article1 : article ) {
            list.add( toDto( article1 ) );
        }

        return list;
    }
}
