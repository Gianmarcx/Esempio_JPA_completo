package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.Prodotto;

public interface ProdottiService {

    List<Prodotto> ottieniTuttiProdotti();

    Prodotto ottieniProdotto(Long id);

    Prodotto creaProdotto(Prodotto prodotto);

    Prodotto aggiornaProdotto(Long id, Prodotto prodotto);

    void eliminaProdotto(Long id);
}
