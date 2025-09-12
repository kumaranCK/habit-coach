package dev.habits.habit_coach_backend.DTO;

public record StreakResponse(String habitId, String userId, int currentStreakDays) {}
