package com.stevenluna.uisrael.msa.seguidores.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "followers")
public class FollowerEntity {

    @Id
    private String id;
    private String userId;
    private String followerUserId;
    private LocalDateTime followDate;
    private String status;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getFollowerUserId() {
        return followerUserId;
    }
    public void setFollowerUserId(String followerUserId) {
        this.followerUserId = followerUserId;
    }
    public LocalDateTime getFollowDate() {
        return followDate;
    }
    public void setFollowDate(LocalDateTime followDate) {
        this.followDate = followDate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
