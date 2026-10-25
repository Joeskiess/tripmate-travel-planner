package com.travel.itinerary.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final String API_KEY = "215684d31be5e083a73eaf0a051a50b1";

    @GetMapping
    public ResponseEntity<String> getWeather(@RequestParam String city) {
        try {
            // Encode spaces or special characters in city names (e.g. "New York")
            String cleanCity = java.net.URLEncoder.encode(city, "UTF-8");
            String url = "https://api.openweathermap.org/data/2.5/weather?q=" + cleanCity + "&units=metric&appid=" + API_KEY;
            
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Prints the exact error in your VS Code terminal
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"Failed to fetch weather: " + e.getMessage() + "\"}");
        }
    }
}