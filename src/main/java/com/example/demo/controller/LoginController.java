package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // frontend Vite
public class LoginController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        // Login finto per test
        if (request.getEmail().equals("admin@example.com") &&
            request.getPassword().equals("1234")) {

            return new LoginResponse("LOGIN_OK", "TOKEN123456");
        }

        throw new RuntimeException("Credenziali errate");
    }
}
