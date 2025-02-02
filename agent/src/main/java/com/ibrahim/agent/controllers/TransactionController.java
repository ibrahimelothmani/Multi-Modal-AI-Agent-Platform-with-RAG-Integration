package com.ibrahim.agent.controllers;


import com.ibrahim.agent.entities.Transaction;
import com.ibrahim.agent.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")

public class TransactionController {

    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }


    @GetMapping("/transactions")
    public List<Transaction> transactions(){
        return transactionRepository.findAll();
    }
}