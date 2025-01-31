package com.stevenluna.uisrael.msa.seguidores.repository;

import com.stevenluna.uisrael.msa.seguidores.entity.FollowerEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowerRepository extends MongoRepository<FollowerEntity, String> {
}
