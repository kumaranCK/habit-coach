package dev.habits.habit_coach_backend.DAO;

import dev.habits.habit_coach_backend.model.HabitLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface HabitLogDAO extends MongoRepository<HabitLog,String> {
    List<HabitLog> findByHabitIdAndUserIdOrderByDateDesc(String habitId, String userId);
    boolean existsByHabitIdAndUserIdAndDate(String habitId, String userId, LocalDate date);
}
