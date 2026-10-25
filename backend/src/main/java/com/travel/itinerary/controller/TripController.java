package com.travel.itinerary.controller;

import com.travel.itinerary.model.Activity;
import com.travel.itinerary.model.Trip;
import com.travel.itinerary.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @Autowired
    private TripRepository tripRepository;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return tripRepository.save(trip);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id) {
        tripRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{tripId}/activities")
    public ResponseEntity<Trip> addActivity(@PathVariable Long tripId, @RequestBody Activity activity) {
        return tripRepository.findById(tripId).map(trip -> {
            activity.setTrip(trip);
            trip.getActivities().add(activity);
            Trip updatedTrip = tripRepository.save(trip);
            return ResponseEntity.ok(updatedTrip);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{tripId}/activities/{activityId}")
    public ResponseEntity<Trip> deleteActivity(@PathVariable Long tripId, @PathVariable Long activityId) {
        return tripRepository.findById(tripId).map(trip -> {
            trip.getActivities().removeIf(act -> act.getId().equals(activityId));
            Trip updatedTrip = tripRepository.save(trip);
            return ResponseEntity.ok(updatedTrip);
        }).orElse(ResponseEntity.notFound().build());
    }
}