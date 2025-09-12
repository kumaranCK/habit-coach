package dev.habits.habit_coach_backend;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import java.util.TimeZone;

@SpringBootApplication
@EnableCaching
public class HabitCoachBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HabitCoachBackendApplication.class, args);
	}

    @PostConstruct
    void tz(){
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
    }

}
