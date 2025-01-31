package com.stevenluna.uisrael.msa.seguidores.service;

import com.stevenluna.uisrael.msa.seguidores.entity.FollowerEntity;
import com.stevenluna.uisrael.msa.seguidores.repository.FollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    public FollowerService(FollowerRepository followerRepository) {
        this.followerRepository = followerRepository;
    }
    public List<FollowerEntity> getAllFollowers() {
        return followerRepository.findAll();
    }
    public FollowerEntity getFollowerById(String id) {
        return followerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Follower not found with id: " + id));
    }
    public FollowerEntity addFollower(FollowerEntity followerEntity) {
        return followerRepository.save(followerEntity);
    }
    public FollowerEntity updateFollower(FollowerEntity follower) {
        if (!followerRepository.existsById(follower.getId())) {
            throw new RuntimeException("Follower not found with id: " + follower.getId());
        }
        return followerRepository.save(follower);
    }
    public void deleteFollower(String id) {
        if (!followerRepository.existsById(id)) {
            throw new RuntimeException("Follower not found with id: " + id);
        }
        followerRepository.deleteById(id);
    }

}
