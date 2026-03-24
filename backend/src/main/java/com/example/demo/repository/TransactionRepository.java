package com.example.demo.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Transaction;
import com.example.demo.entity.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserIdOrderByDateDesc(Long userId);

    @Query("""
           SELECT COALESCE(SUM(t.amount),0)
           FROM Transaction t
           WHERE t.user.id = :userId
           AND t.type = :type
           AND MONTH(t.date) = :month
           AND YEAR(t.date) = :year
           """)
    BigDecimal getMonthlyTotalByType(@Param("userId") Long userId,
                                     @Param("type") TransactionType type,
                                     @Param("month") int month,
                                     @Param("year") int year);

    @Query("""
           SELECT t.category, COALESCE(SUM(t.amount),0)
           FROM Transaction t
           WHERE t.user.id = :userId
           AND t.type = :type
           AND MONTH(t.date) = :month
           AND YEAR(t.date) = :year
           GROUP BY t.category
           """)
    List<Object[]> getCategoryWiseExpense(@Param("userId") Long userId,
                                          @Param("type") TransactionType type,
                                          @Param("month") int month,
                                          @Param("year") int year);
}