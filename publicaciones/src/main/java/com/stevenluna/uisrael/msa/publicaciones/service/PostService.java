package com.stevenluna.uisrael.msa.publicaciones.service;

import com.stevenluna.uisrael.msa.publicaciones.entity.PostEntity;
import com.stevenluna.uisrael.msa.publicaciones.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostEntity> getAllPosts() {
        return postRepository.findAll();
    }

    public PostEntity getPostById(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    public PostEntity addPost(PostEntity postEntity) {
        return postRepository.save(postEntity);
    }

    public PostEntity updatePost(PostEntity post) {
        if (!postRepository.existsById(post.getId())) {
            throw new RuntimeException("Post not found with id: " + post.getId());
        }
        return postRepository.save(post);
    }

    public void deletePost(String id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }
}
