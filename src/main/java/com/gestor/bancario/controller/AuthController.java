package com.gestor.bancario.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {
        String usuario = datos.get("usuario");
        String password = datos.get("password");
        
        
        if ("admin".equals(usuario) && "1234".equals(password)) {
            Map<String, Object> userData = Map.of(
                "id", 1,
                "nombre", "Administrador",
                "usuario", usuario,
                "email", "admin@bancario.com",
                "cuenta", "1001234567",
                "saldo", 1500000
            );
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login exitoso",
                "data", userData
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Credenciales incorrectas"
            ));
        }
    }
}
