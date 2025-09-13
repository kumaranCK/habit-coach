package dev.habits.habit_coach_backend.Controller;


import dev.habits.habit_coach_backend.DAO.HabitDAO;
import dev.habits.habit_coach_backend.DAO.HabitLogDAO;
import dev.habits.habit_coach_backend.DAO.UserDAO;
import dev.habits.habit_coach_backend.DTO.CreateHabitRequest;
import dev.habits.habit_coach_backend.DTO.LogHabitRequest;
import dev.habits.habit_coach_backend.DTO.StreakResponse;
import dev.habits.habit_coach_backend.model.Habit;
import dev.habits.habit_coach_backend.model.HabitLog;
import jakarta.validation.Valid;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

//http://localhost:5173
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/habits")

public class HabitController {
    private final HabitDAO habitDAO;
    private final HabitLogDAO habitLogDAO;
    private final UserDAO userDAO;
    private static final Logger log = LoggerFactory.getLogger(HabitController.class);

    public HabitController(HabitDAO habitDAO, HabitLogDAO habitLogDAO, UserDAO userDAO) {
        this.habitDAO = habitDAO;
        this.habitLogDAO = habitLogDAO;
        this.userDAO = userDAO;
    }

    // CREATE habit
    @PostMapping
    @CacheEvict(value = "habits", key = "#habit.userId")
    public Habit createHabit(@RequestBody Habit habit) {
        System.out.println("Entered post mapping of Habit creation");
        if (habit.getUserId() == null || !userDAO.existsById(habit.getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user");
        }
        log.info("Creating habit for userId={} with name={}", habit.getUserId(), habit.getName());
        return habitDAO.save(habit);
    }

    @GetMapping("/{userId}")
    @Cacheable(value = "habits", key = "#userId")   // Redis cache
    public List<Habit> list(@PathVariable String userId) {
        System.out.println("Inside Get mapping of Habits");
        return habitDAO.findByUserId(userId);
    }

    @PostMapping("/{habitId}/log")
    public HabitLog log(@PathVariable String habitId, @Valid @RequestBody LogHabitRequest req) {
        System.out.println("error message update to check git :Check ");
        if (!userDAO.existsById(req.userId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user");
        }

        LocalDate date = (req.date() == null) ? LocalDate.now() : req.date();

        if (habitLogDAO.existsByHabitIdAndUserIdAndDate(habitId, req.userId(), date)) {
            return habitLogDAO.findByHabitIdAndUserIdOrderByDateDesc(habitId, req.userId())
                    .stream()
                    .filter(l -> l.getDate().isEqual(date))
                    .findFirst()
                    .orElseThrow();
        }

        HabitLog newLog = HabitLog.builder()
                .habitId(habitId)
                .userId(req.userId())
                .date(date)
                .build();

        return habitLogDAO.save(newLog);
    }

    @GetMapping("/{habitId}/streak/{userId}")
    public StreakResponse streak(@PathVariable String habitId, @PathVariable String userId) {
        if (!userDAO.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user");
        }

        List<HabitLog> logs = habitLogDAO.findByHabitIdAndUserIdOrderByDateDesc(habitId, userId);
        int streak = computeStreak(logs);
        return new StreakResponse(habitId, userId, streak);
    }

    // --- helper: simple streak calc (counts consecutive dates up to today) ---
    private int computeStreak(List<HabitLog> logsDesc) {
        if (logsDesc.isEmpty()) return 0;
        LocalDate cursor = LocalDate.now();
        int streak = 0;

        for (HabitLog log : logsDesc) {
            if (log.getDate().isEqual(cursor)) {
                streak++;
                cursor = cursor.minusDays(1);
            } else if (log.getDate().isEqual(cursor.minusDays(1))) {
                // if today not done but yesterday done, break (streak only up to today)
                break;
            } else {
                break;
            }
        }
        return streak;
    }
}
