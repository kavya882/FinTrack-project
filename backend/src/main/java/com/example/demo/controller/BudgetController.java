package com.example.demo.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BudgetAlertResponse;
import com.example.demo.dto.BudgetRequest;
import com.example.demo.dto.BudgetResponse;
import com.example.demo.service.BudgetService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public BudgetResponse createBudget(
            @Valid @RequestBody BudgetRequest request,
            Authentication authentication) {

        return budgetService.createBudget(authentication.getName(), request);
    }

    @GetMapping
    public List<BudgetResponse> getBudgets(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {

        return budgetService.getBudgets(authentication.getName(), month, year);
    }

    @GetMapping("/alerts")
    public List<BudgetAlertResponse> getAlerts(
            @RequestParam Integer month,
            @RequestParam Integer year,
            Authentication authentication) {

        return budgetService.getBudgetAlerts(authentication.getName(), month, year);
    }
}