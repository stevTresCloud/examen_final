package com.stevenluna.uisrael.msa.seguidores.controller;

import com.stevenluna.uisrael.msa.seguidores.entity.FollowerEntity;
import com.stevenluna.uisrael.msa.seguidores.service.FollowerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/stevenluna/followers")
public class FollowerController {

    @Autowired
    private final FollowerService followerService;

    public FollowerController(FollowerService followerService) {
        this.followerService = followerService;
    }

    @GetMapping("/puerto")
    public String mostrarPuerto(HttpServletRequest request) {
        // Esto sirve para identificar el puerto en el que está corriendo la instancia
        return "Instancia en puerto: " + request.getLocalPort();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FollowerEntity> getAllFollowers() {
        return followerService.getAllFollowers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FollowerEntity getFollowerById(@PathVariable String id) {
        return followerService.getFollowerById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FollowerEntity addFollower(@RequestBody FollowerEntity followerEntity) {
        return followerService.addFollower(followerEntity);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FollowerEntity updateFollower(@PathVariable String id, @RequestBody FollowerEntity followerEntity) {
        followerEntity.setId(id);
        return followerService.updateFollower(followerEntity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFollower(@PathVariable String id) {
        followerService.deleteFollower(id);
    }
}
