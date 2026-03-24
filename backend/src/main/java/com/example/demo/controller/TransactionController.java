package com.example.demo.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.TransactionRequest;
import com.example.demo.dto.TransactionResponse;
import com.example.demo.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // Add transaction
    @PostMapping
    public TransactionResponse addTransaction(
            @Valid @RequestBody TransactionRequest request,
            Authentication authentication) {

        return transactionService.addTransaction(authentication.getName(), request);
    }

    // Get all transactions
    @GetMapping
    public List<TransactionResponse> getAllTransactions(Authentication authentication) {

        return transactionService.getAllTransactions(authentication.getName());
    }
}