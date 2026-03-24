package com.example.demo.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.MonthlySummaryResponse;
import com.example.demo.entity.TransactionType;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public AnalyticsService(UserRepository userRepository,
                            TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public MonthlySummaryResponse getMonthlySummary(String username, int month, int year) {

        User user = getUserByUsername(username);

        BigDecimal income = transactionRepository.getMonthlyTotalByType(
                user.getId(),
                TransactionType.INCOME,
                month,
                year
        );

        BigDecimal expense = transactionRepository.getMonthlyTotalByType(
                user.getId(),
                TransactionType.EXPENSE,
                month,
                year
        );

        List<Object[]> rawData = transactionRepository.getCategoryWiseExpense(
                user.getId(),
                TransactionType.EXPENSE,
                month,
                year
        );

        Map<String, BigDecimal> categoryMap = new HashMap<>();

        for (Object[] row : rawData) {
            categoryMap.put(row[0].toString(), (BigDecimal) row[1]);
        }

        return new MonthlySummaryResponse(
                income,
                expense,
                income.subtract(expense),
                categoryMap
        );
    }
}