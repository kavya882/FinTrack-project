package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TransactionRequest;
import com.example.demo.dto.TransactionResponse;
import com.example.demo.entity.Transaction;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public TransactionResponse addTransaction(String username, TransactionRequest request) {

        User user = getUserByUsername(username);

        Transaction transaction = new Transaction();
        transaction.setTitle(request.getTitle());
        transaction.setNote(request.getNote());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setAmount(request.getAmount());
        transaction.setDate(request.getDate());
        transaction.setUser(user);

        Transaction saved = transactionRepository.save(transaction);

        return new TransactionResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getNote(),
                saved.getType(),
                saved.getCategory(),
                saved.getAmount(),
                saved.getDate()
        );
    }

    public List<TransactionResponse> getAllTransactions(String username) {

        User user = getUserByUsername(username);

        List<Transaction> transactions =
                transactionRepository.findByUserIdOrderByDateDesc(user.getId());

        List<TransactionResponse> responseList = new ArrayList<>();

        for (Transaction t : transactions) {

            responseList.add(new TransactionResponse(
                    t.getId(),
                    t.getTitle(),
                    t.getNote(),
                    t.getType(),
                    t.getCategory(),
                    t.getAmount(),
                    t.getDate()
            ));
        }

        return responseList;
    }
}