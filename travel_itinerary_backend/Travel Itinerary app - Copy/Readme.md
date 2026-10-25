# Travel Itinerary Full-Stack Reference Architecture

This folder contains the reference Spring Boot + React project unzipped from `travel_itinerary.zip`.

```text
travel-itinerary-app/
├── Backend/                         # Spring Boot 3.2 + PostgreSQL REST Application
│   ├── pom.xml                      # Maven configuration with Spring Boot Starter & PostgreSQL Driver
│   └── src/main/
│       ├── java/com/travel/itinerary/
│       │   ├── TravelItineraryApplication.java  # Main Application Runner
│       │   ├── config/SecurityConfig.java       # CORS & Security filter chain
│       │   ├── controller/
│       │   │   ├── TripController.java          # REST CRUD endpoints for /api/trips
│       │   │   └── WeatherController.java       # Real-time OpenWeatherMap proxy for /api/weather
│       │   ├── model/
│       │   │   ├── Activity.java                # JPA Entity for Itinerary Activities & Expenses
│       │   │   ├── Trip.java                    # JPA Entity for Itinerary Trips (1 to N with Activity)
│       │   │   └── User.java                    # JPA Entity for Authentication Users
│       │   ├── repository/
│       │   │   ├── TripRepository.java          # Spring Data JPA Repository for Trips
│       │   │   └── UserRepository.java          # Spring Data JPA Repository for Users
│       │   └── service/
│       │       └── TripService.java             # Business Logic Service Layer
│       └── resources/
│           └── application.properties           # PostgreSQL datasource & port configuration
└── Dashboard/                       # Standalone Reference React Frontend
    ├── package.json                 # Dependencies (@hello-pangea/dnd, chart.js, react-chartjs-2, axios)
    ├── vite.config.js               # Vite config for port 5173
    ├── index.html                   # Entry point
    └── src/
        ├── App.jsx                  # Dashboard controller with metric cards
        ├── components/
        │   ├── TripList.jsx         # Active vs All trips filter list
        │   ├── TripForm.jsx         # Trip creation form
        │   ├── ItineraryDetails.jsx # Day-by-day activity manager
        │   ├── DragDropSchedule.jsx # Touch/pointer drag-and-drop schedule reordering
        │   ├── ExpenseChart.jsx     # Chart.js donut expense breakdown
        │   ├── WeatherWidget.jsx    # Live OpenWeatherMap weather card
        │   └── AuthModal.jsx        # JWT login & signup modal
        └── services/
            └── api.js               # Axios REST client

## Ports & Communication
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432` (Database: `travel_itinerary`)
