package com.stevenluna.uisrael.msa.usuarios.controller;

import com.stevenluna.uisrael.msa.usuarios.entity.UserEntity;
import com.stevenluna.uisrael.msa.usuarios.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stevenluna/users")
//@CrossOrigin(
//        origins = "*",  // o "*" si deseas permitir todos
//        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE }
//)
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/puerto")
    public String mostrarPuerto(HttpServletRequest request) {
        // Esto sirve para identificar el puerto en el que está corriendo la instancia
        return "Instancia en puerto: " + request.getLocalPort();
    }

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserEntity getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserEntity addUser(@RequestBody UserEntity userEntity) {
        return userService.addUser(userEntity);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserEntity updateUser(@PathVariable Long id, @RequestBody UserEntity userEntity) {
        userEntity.setId(id);
        return userService.updateUser(userEntity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
