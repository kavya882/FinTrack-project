package com.example.demo.dto;

import java.math.BigDecimal;

import com.example.demo.entity.Category;

public class BudgetResponse {

    private Long id;
    private Category category;
    private BigDecimal monthlyLimit;
    private Integer month;
    private Integer year;

    public BudgetResponse() {
    }

    public BudgetResponse(Long id, Category category, BigDecimal monthlyLimit, Integer month, Integer year) {
        this.id = id;
        this.category = category;
        this.monthlyLimit = monthlyLimit;
        this.month = month;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
        return category;
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public Integer getMonth() {
        return month;
    }

    public Integer getYear() {
        return year;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}