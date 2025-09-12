package dev.habits.habit_coach_backend.DTO;


import java.util.List;

public record ChatResponse(List<Choice> choices) {}