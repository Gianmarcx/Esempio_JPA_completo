package com.example.demo.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Prodotto;
import com.example.demo.repository.ProdottoRepository;
import com.example.demo.service.ProdottiService;

@Service
public class ProdottoServiceImpl implements ProdottiService {

    @Autowired
    private ProdottoRepository prodottoRepository;

    @Override
    public List<Prodotto> ottieniTuttiProdotti() {
        return prodottoRepository.findAll();
    }

    @Override
    public Prodotto ottieniProdotto(Long id) {
        return prodottoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prodotto non trovato con id: " + id));
    }

    @Override
    public Prodotto creaProdotto(Prodotto prodotto) {

        if (prodotto.getPrezzoScontato() == null) {
            prodotto.setPrezzoScontato(BigDecimal.ZERO);
        }

        prodotto.setCreatoIl(LocalDateTime.now());
        return prodottoRepository.save(prodotto);
    }

    @Override
    public Prodotto aggiornaProdotto(Long id, Prodotto prodotto) {
        Prodotto existing = ottieniProdotto(id);

        existing.setTitolo(prodotto.getTitolo());
        existing.setDescrizione(prodotto.getDescrizione());
        existing.setPrezzo(prodotto.getPrezzo());

        if (prodotto.getPrezzoScontato() == null) {
            existing.setPrezzoScontato(BigDecimal.ZERO);
        } else {
            existing.setPrezzoScontato(prodotto.getPrezzoScontato());
        }

        existing.setQuantita(prodotto.getQuantita());
        existing.setVisibile(prodotto.getVisibile());
        existing.setAggiornatoIl(LocalDateTime.now());

        return prodottoRepository.save(existing);
    }

    @Override
    public void eliminaProdotto(Long id) {
        prodottoRepository.deleteById(id);
    }
}
