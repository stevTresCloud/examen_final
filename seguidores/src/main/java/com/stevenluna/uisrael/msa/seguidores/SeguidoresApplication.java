package com.stevenluna.uisrael.msa.seguidores;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SeguidoresApplication {

    public static void main(String[] args) {
        SpringApplication.run(SeguidoresApplication.class, args);
    }

}
