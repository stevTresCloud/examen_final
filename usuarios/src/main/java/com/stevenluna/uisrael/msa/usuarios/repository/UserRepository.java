package com.stevenluna.uisrael.msa.usuarios.repository;


import com.stevenluna.uisrael.msa.usuarios.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
