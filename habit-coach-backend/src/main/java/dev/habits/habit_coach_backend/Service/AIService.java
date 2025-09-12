package dev.habits.habit_coach_backend.Service;

import dev.habits.habit_coach_backend.DTO.AIResponseDTO;
import dev.habits.habit_coach_backend.DTO.ChatMessage;
import dev.habits.habit_coach_backend.DTO.ChatRequest;
import dev.habits.habit_coach_backend.DTO.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class AIService {
    private final WebClient webClient;

    public AIService(
            @Value("${gemini.api.url}") String baseUrl,
            @Value("${gemini.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("x-goog-api-key", apiKey) // ✅ correct header
                .build();
    }

    public String generateResponse(String prompt) {
        AIResponseDTO response = webClient.post()
                .uri("/models/gemini-1.5-flash:generateContent")
                .bodyValue("""
                    {
                      "contents": [
                        {
                          "parts": [{"text": "%s"}]
                        }
                      ]
                    }
                """.formatted(prompt))
                .retrieve()
                .bodyToMono(AIResponseDTO.class)
                .block();

        // ✅ Extract only AI's answer
        if (response != null &&
                response.getCandidates() != null &&
                !response.getCandidates().isEmpty() &&
                response.getCandidates().get(0).getContent() != null &&
                !response.getCandidates().get(0).getContent().getParts().isEmpty()) {
            return response.getCandidates().get(0).getContent().getParts().get(0).getText();
        }

        return "No response from AI";
    }
}
