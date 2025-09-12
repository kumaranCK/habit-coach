package dev.habits.habit_coach_backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record CreateHabitRequest(
        @NotBlank String userId,
        @NotBlank String name,
        String description,
        @NotEmpty Set<String> scheduleDays // e.g. MON,WED,FRI
) {}