package dev.habits.habit_coach_backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "habit_logs")
public class HabitLog {
    @Id
    private String id;
    private String habitId;
    private String userId;
    private LocalDate date; // completed on (local date)
}
