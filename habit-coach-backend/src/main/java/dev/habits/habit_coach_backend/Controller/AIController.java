package dev.habits.habit_coach_backend.Controller;

import dev.habits.habit_coach_backend.Service.AIService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {
    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/ask")
    public String askAI(@RequestParam String prompt) {
        return aiService.generateResponse(prompt);
    }
}
