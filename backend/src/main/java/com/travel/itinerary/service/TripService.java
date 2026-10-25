package com.travel.itinerary.service;

import com.travel.itinerary.model.Activity;
import com.travel.itinerary.model.Trip;
import com.travel.itinerary.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public Trip addActivityToTrip(Long tripId, Activity activity) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));
        
        activity.setTrip(trip); // Sets foreign key relationship
        trip.getActivities().add(activity);
        return tripRepository.save(trip);
    }

    public Trip deleteActivityFromTrip(Long tripId, Long activityId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));
        
        trip.getActivities().removeIf(activity -> activity.getId() != null && activity.getId().equals(activityId));
        return tripRepository.save(trip);
    }
}