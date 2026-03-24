package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.demo.entity.Category;
import com.example.demo.entity.TransactionType;

public class TransactionResponse {

    private Long id;
    private String title;
    private String note;
    private TransactionType type;
    private Category category;
    private BigDecimal amount;
    private LocalDate date;

    public TransactionResponse() {
    }

    public TransactionResponse(Long id, String title, String note, TransactionType type, Category category,
            BigDecimal amount, LocalDate date) {
        this.id = id;
        this.title = title;
        this.note = note;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getNote() {
        return note;
    }

    public TransactionType getType() {
        return type;
    }

    public Category getCategory() {
        return category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}