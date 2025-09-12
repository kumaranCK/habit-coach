package dev.habits.habit_coach_backend.DAO;

import dev.habits.habit_coach_backend.model.Habit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HabitDAO extends MongoRepository<Habit,String> {
    List<Habit> findByUserId(String userId);
}
