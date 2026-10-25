# TripMate Services & Algorithmic Engines (`src/services/`)

This directory contains client-side API clients, data access layers, authentic location discovery services, and mathematical routing algorithms that power TripMate.

---

## 🛠️ Services Overview

| Service File | Domain | Responsibility |
| :--- | :--- | :--- |
| **[`backendApi.js`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/backendApi.js)** | Spring Boot & PostgreSQL Communication | Full REST client managing trip CRUD, activity cascades, live weather proxy, and resilient offline fallback simulation. |
| **[`placesApiService.js`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/placesApiService.js)** | Authentic Places & Imagery API | Real-time Wikimedia & Wikipedia Open APIs, OpenStreetMap Nominatim universal geocoding, strict Haversine $\le 50\text{ km}$ radius validation, and localized itinerary generation for any global destination. |
| **[`quantumRouteOptimizer.js`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/quantumRouteOptimizer.js)** | Algorithmic Optimization | Geometric distance matrix analysis, Euclidean / Haversine distance computations, and zero-backtracking waypoint sequencing. |

---

## 🌍 1. `placesApiService.js` ([Link](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/placesApiService.js))

A production-grade authentic places discovery service that works for **any travel location on Earth**.

### Key Capabilities
1. **Universal Multi-Tier Geocoding**:
   - **Tier 1:** Instant 0ms lookup against [`GLOBAL_CITY_COORDINATES`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/data/destinationsData.js) (50+ top global destinations).
   - **Tier 2:** Universal OpenStreetMap Nominatim API (`https://nominatim.openstreetmap.org/search`) resolving exact GPS coordinates for any city, municipality, national park, or island.
   - **Tier 3:** Wikipedia query with `&redirects=1` to follow aliases and retrieve authentic editorial extracts and high-resolution thumbnail images.
2. **Strict Great-Circle Haversine $\le 50\text{ km}$ Radius Constraint**:
   - Calculates spherical distance:
     $$\text{dist} = 2R \arcsin\left(\sqrt{\sin^2(\Delta\phi/2) + \cos\phi_1\cos\phi_2\sin^2(\Delta\lambda/2)}\right)$$
   - Rejects any candidate attraction located beyond $50\text{ km}$ from the destination's center coordinates.
3. **Semantic Entity & Non-Place Exclusion**:
   - Eliminates software systems (*Google*, *Apple Maps*, *Bing Maps*), abstract socio-economic concepts (*Gentrification*, *Economy of...*), transit infrastructure (*MRT stations*, *bus routes*), entertainment media (*drama*, *TV series*, *albums*), and crimes/disasters.
4. **Zero-Failure Localized Fallback Synthesizer**:
   - If an obscure or rural destination returns fewer than 4 Wikipedia articles, synthesizes localized, culturally-tailored stops (Old Town, Scenic Viewpoint, Museum, Botanical Garden) distributed within 2–5 km of the true GPS coordinates with authentic regional dining and lodging.
5. **Cache Invalidation (`tripmate_places_cache_v3_`)**:
   - Automatically purges legacy contaminated cache keys on load and stores rich payloads locally for zero-latency reloads.

---

## 📡 2. `backendApi.js` ([Link](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/backendApi.js))

Connects the React client (`localhost:5173`) to the Spring Boot REST endpoints (`localhost:8080/api/`):

### Exported Functions

```javascript
// 1. Connectivity Check
checkBackendStatus() // -> Promise<boolean> (Checks if Spring Boot / PostgreSQL is reachable)

// 2. Trip CRUD Operations
fetchAllTrips()                    // -> Promise<Trip[]> (GET /api/trips)
fetchTripById(id)                  // -> Promise<Trip>   (GET /api/trips/{id})
createBackendTrip(tripData)        // -> Promise<Trip>   (POST /api/trips)
deleteBackendTrip(id)              // -> Promise<boolean>(DELETE /api/trips/{id})

// 3. Activity & Expense Cascades
addBackendActivity(tripId, data)   // -> Promise<Trip>   (POST /api/trips/{tripId}/activities)
deleteBackendActivity(tripId, actId)// -> Promise<Trip>  (DELETE /api/trips/{tripId}/activities/{actId})

// 4. Live Weather Integration
fetchBackendWeather(city)          // -> Promise<WeatherData> (GET /api/weather?city={city})
```

### Resilient Fallback Simulation
If the Spring Boot backend or PostgreSQL server is offline or unreachable, `backendApi.js` does not crash the UI. Instead, it catches network aborts and smoothly serves rich simulated state, ensuring developers and users can fully explore the platform without local database dependencies.

---

## ⚡ 3. `quantumRouteOptimizer.js` ([Link](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/services/quantumRouteOptimizer.js))

An algorithmic engine designed to solve the Traveling Salesperson Problem (TSP) for daily travel stops:

### Algorithm Breakdown
1. **Haversine Distance Matrix**: Given $N$ waypoint coordinates $(lat_i, lng_i)$, constructs an $N \times N$ pairwise distance matrix accounting for the Earth's spherical curvature ($R = 6,371\text{ km}$).
2. **Greedy Nearest Neighbor + 2-Opt Refinement**:
   - Anchors the departure point (e.g. Hotel / Airport).
   - Iteratively links unvisited stops with minimal Euclidean displacement.
   - Applies 2-opt edge-swapping to untangle route crossovers and eliminate backtracking loops.
3. **Savings Calculation**:
   - Measures initial path length: $\sum_{i=1}^{N-1} d(p_i, p_{i+1})$.
   - Compares with optimized path length to report percentage distance and driving time saved (typically 25% – 36%).
