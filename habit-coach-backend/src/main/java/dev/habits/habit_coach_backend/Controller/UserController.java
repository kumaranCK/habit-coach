package dev.habits.habit_coach_backend.Controller;

import dev.habits.habit_coach_backend.DAO.UserDAO;
import dev.habits.habit_coach_backend.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserDAO userDAO;
    private final BCryptPasswordEncoder passwordEncoder;

    public record RegisterRequest(String username, String email, String password) {}
    public record LoginRequest(String username, String password) {}

    public UserController(UserDAO userDAO,
                          BCryptPasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest req) {
        String username = req.username().trim().toLowerCase();
        if (username.isBlank() || req.password() == null || req.password().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid username or password (min 6 chars)");
        }
        if (userDAO.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already taken");
        }

        User u = new User();
        u.setUsername(username);
        u.setEmail(req.email());
        u.setPasswordHash(passwordEncoder.encode(req.password()));
        u.setCreatedOn(LocalDateTime.now());

        User saved = userDAO.save(u);
        // return minimal info - client stores userId and username
        return Map.of("userId", saved.getId(), "username", saved.getUsername());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest req) {
        User user = userDAO.findByUsername(req.username().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return Map.of("userId", user.getId(), "username", user.getUsername());
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return userDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
