package com.stevenluna.uisrael.msa.seguidores.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ProxyController {

    @Autowired
    private RestTemplate loadBalancedRestTemplate;

    @GetMapping("/api/stevenluna/proxy/posts")
    public String proxyAllProducts() {
        // Eureka + LoadBalancer resolverán si la instancia 8081, 8082, etc.
        return loadBalancedRestTemplate.getForObject(
                "http://examenmicroservicios/api/stevenluna/posts",
                String.class
        );
    }
}
