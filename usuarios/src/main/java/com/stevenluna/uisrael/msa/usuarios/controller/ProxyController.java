package com.stevenluna.uisrael.msa.usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ProxyController {

    @Autowired
    private RestTemplate loadBalancedRestTemplate;

    @GetMapping("/api/stevenluna/proxy/users")
    public String proxyAllProducts() {
        // Al usar "http://semana6_microservicio/api/products",
        // Eureka + LoadBalancer resolverán si la instancia 8081, 8082, etc.
        return loadBalancedRestTemplate.getForObject(
                "http://examenmicroservicios/api/stevenluna/users",
                String.class
        );
    }
}
