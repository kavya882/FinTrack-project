package com.example.demo.dto;

import java.math.BigDecimal;

import com.example.demo.entity.Category;

public class BudgetAlertResponse {

    private Category category;
    private BigDecimal limitAmount;
    private BigDecimal spentAmount;
    private String status;

    public BudgetAlertResponse() {
    }

    public BudgetAlertResponse(Category category, BigDecimal limitAmount, BigDecimal spentAmount, String status) {
        this.category = category;
        this.limitAmount = limitAmount;
        this.spentAmount = spentAmount;
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public BigDecimal getLimitAmount() {
        return limitAmount;
    }

    public BigDecimal getSpentAmount() {
        return spentAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setLimitAmount(BigDecimal limitAmount) {
        this.limitAmount = limitAmount;
    }

    public void setSpentAmount(BigDecimal spentAmount) {
        this.spentAmount = spentAmount;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}