package com.example.demo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BudgetAlertResponse;
import com.example.demo.dto.BudgetRequest;
import com.example.demo.dto.BudgetResponse;
import com.example.demo.entity.Budget;
import com.example.demo.entity.User;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BudgetRepository;
import com.example.demo.repository.UserRepository;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public BudgetResponse createBudget(String username, BudgetRequest request) {

        User user = getUserByUsername(username);

        if (budgetRepository
                .findByUserIdAndCategoryAndMonthAndYear(
                        user.getId(),
                        request.getCategory(),
                        request.getMonth(),
                        request.getYear())
                .isPresent()) {

            throw new BadRequestException("Budget already exists for this category and month");
        }

        Budget budget = new Budget();
        budget.setCategory(request.getCategory());
        budget.setMonthlyLimit(request.getMonthlyLimit());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setUser(user);

        Budget saved = budgetRepository.save(budget);

        return new BudgetResponse(
                saved.getId(),
                saved.getCategory(),
                saved.getMonthlyLimit(),
                saved.getMonth(),
                saved.getYear());
    }

    public List<BudgetResponse> getBudgets(String username, Integer month, Integer year) {

        User user = getUserByUsername(username);

        List<Budget> budgets =
                budgetRepository.findByUserIdAndMonthAndYear(user.getId(), month, year);

        if (budgets == null) {
            budgets = new ArrayList<>();
        }

        List<BudgetResponse> result = new ArrayList<>();

        for (Budget b : budgets) {

            result.add(new BudgetResponse(
                    b.getId(),
                    b.getCategory(),
                    b.getMonthlyLimit(),
                    b.getMonth(),
                    b.getYear()));
        }

        return result;
    }

    public List<BudgetAlertResponse> getBudgetAlerts(String username, Integer month, Integer year) {

        User user = getUserByUsername(username);

        List<Budget> budgets =
                budgetRepository.findByUserIdAndMonthAndYear(user.getId(), month, year);

        if (budgets == null) {
            budgets = new ArrayList<>();
        }

        List<BudgetAlertResponse> alerts = new ArrayList<>();

        for (Budget budget : budgets) {

            BigDecimal spent = BigDecimal.ZERO;

            String status =
                    spent.compareTo(budget.getMonthlyLimit()) > 0
                            ? "LIMIT EXCEEDED"
                            : "WITHIN LIMIT";

            alerts.add(new BudgetAlertResponse(
                    budget.getCategory(),
                    budget.getMonthlyLimit(),
                    spent,
                    status));
        }

        return alerts;
    }
}