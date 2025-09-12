package dev.habits.habit_coach_backend.DTO;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record LogHabitRequest(
        @NotBlank String userId,
        LocalDate date // optional; if null we use today
) {}