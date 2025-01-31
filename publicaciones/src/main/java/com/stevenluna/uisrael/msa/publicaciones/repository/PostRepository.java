package com.stevenluna.uisrael.msa.publicaciones.repository;

import com.stevenluna.uisrael.msa.publicaciones.entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<PostEntity, String> {
}
