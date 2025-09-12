package dev.habits.habit_coach_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "habits")
public class Habit implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L; // recommended for Serializable
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private Set<String> scheduleDays;

    private LocalDate createdOn;
}