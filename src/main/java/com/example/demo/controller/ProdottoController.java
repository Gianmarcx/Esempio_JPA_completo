package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.ProdottiService;
import com.example.demo.entity.Prodotto;

@RestController
@RequestMapping("/api/prodotti")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdottoController {

    @Autowired
    ProdottiService prodottoService;

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Prodotto>> ottieniProdotti() {
        return ResponseEntity.ok(prodottoService.ottieniTuttiProdotti());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Prodotto> ottieniProdotto(@PathVariable Long id) {
        return ResponseEntity.ok(prodottoService.ottieniProdotto(id));
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Prodotto> creaProdotto(@RequestBody Prodotto prodotto) {
        return ResponseEntity.ok(prodottoService.creaProdotto(prodotto));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Prodotto> aggiornaProdotto(
            @PathVariable Long id,
            @RequestBody Prodotto prodotto) {

        return ResponseEntity.ok(prodottoService.aggiornaProdotto(id, prodotto));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaProdotto(@PathVariable Long id) {
        prodottoService.eliminaProdotto(id);
        return ResponseEntity.noContent().build();
    }
}
