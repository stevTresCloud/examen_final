package com.stevenluna.uisrael.msa.publicaciones.controller;

import com.stevenluna.uisrael.msa.publicaciones.entity.PostEntity;
import com.stevenluna.uisrael.msa.publicaciones.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/stevenluna/posts")
public class PostController {

    @Autowired
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/puerto")
    public String mostrarPuerto(HttpServletRequest request) {
        // Esto sirve para identificar el puerto en el que está corriendo la instancia
        return "Instancia en puerto: " + request.getLocalPort();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PostEntity> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PostEntity getPostById(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostEntity addPost(@RequestBody PostEntity postEntity) {
        return postService.addPost(postEntity);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PostEntity updatePost(@PathVariable String id, @RequestBody PostEntity postEntity) {
        postEntity.setId(id);
        return postService.updatePost(postEntity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable String id) {
        postService.deletePost(id);
    }
}
