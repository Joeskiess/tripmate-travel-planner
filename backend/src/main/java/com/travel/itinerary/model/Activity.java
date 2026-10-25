package com.travel.itinerary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dayNumber;
    private String time;
    private String title;
    private String location;
    private double cost;
    private String category; // Added category field for Expense Chart

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;

    public Activity() {}

    public Activity(int dayNumber, String time, String title, String location, double cost, String category) {
        this.dayNumber = dayNumber;
        this.time = time;
        this.title = title;
        this.location = location;
        this.cost = cost;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getDayNumber() { return dayNumber; }
    public void setDayNumber(int dayNumber) { this.dayNumber = dayNumber; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}