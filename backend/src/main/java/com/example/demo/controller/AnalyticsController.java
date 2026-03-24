package com.example.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.MonthlySummaryResponse;
import com.example.demo.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/monthly-summary")
    public MonthlySummaryResponse getMonthlySummary(@RequestParam int month,
                                                    @RequestParam int year,
                                                    Authentication authentication) {
        return analyticsService.getMonthlySummary(authentication.getName(), month, year);
    }
}