package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.Map;

public class MonthlySummaryResponse {

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;
    private Map<String, BigDecimal> categoryExpenses;

    public MonthlySummaryResponse() {
    }

    public MonthlySummaryResponse(BigDecimal totalIncome, BigDecimal totalExpense, BigDecimal balance,
            Map<String, BigDecimal> categoryExpenses) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.categoryExpenses = categoryExpenses;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Map<String, BigDecimal> getCategoryExpenses() {
        return categoryExpenses;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public void setCategoryExpenses(Map<String, BigDecimal> categoryExpenses) {
        this.categoryExpenses = categoryExpenses;
    }
}