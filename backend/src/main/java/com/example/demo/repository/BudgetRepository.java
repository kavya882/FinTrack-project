package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Budget;
import com.example.demo.entity.Category;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUserIdAndMonthAndYear(
            Long userId,
            Integer month,
            Integer year
    );

    Optional<Budget> findByUserIdAndCategoryAndMonthAndYear(
            Long userId,
            Category category,
            Integer month,
            Integer year
    );
}