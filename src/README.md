# TripMate Frontend Documentation (`src/`)

Welcome to the frontend application source of **TripMate**. This directory contains the complete client architecture built with **React 19**, **Tailwind CSS v4**, **React Router DOM v7**, **Leaflet**, and **Lucide Icons**.

---

## 🧭 Page Architecture & Routes

The application routing is configured in [`App.jsx`](./src/App.jsx):

```text
/            --> LandingPage.jsx         # Editorial Brand Homepage & 10 Features Deck
/plan        --> PlannerPage.jsx         # 3-Panel Split Workspace (Itinerary, Map, Journey Graph, Kanban)
/create      --> CreateTripPage.jsx      # Dedicated Trip Creation Workflow with Date Validation
/dashboard   --> BackendDashboardPage.jsx# PostgreSQL Telemetry & Database Management Hub
```

---

## 📄 Pages In-Depth

### 1. `LandingPage.jsx` ([Link](./src/pages/LandingPage.jsx))
The public-facing editorial homepage designed to present an art-directed, high-conversion presentation of the platform.
- **Section 1: Brand Navigation**: Clean header with TripMate mountain vector mark, navigation anchor links, and quick-start actions.
- **Section 2: Master Editorial Hero ("The Hook")**:
  - Warm Ivory (`#F7F5EF`) base with Google Font `Newsreader` serif headline *"Your next adventure, made simple."* and hand-drawn forest green underline.
  - Interactive destination search capsule with date picker modal and one-click launch button.
  - Popular destination chips (Bali, Japan, Switzerland, Goa, Singapore) with real photo thumbnails.
  - Trust indicators (`50K+ Trips planned`, `4.8/5 Rating`, `150+ Destinations`).
  - **Dominant Product Showcase**: Embedded [`hero-dashboard.jpg`](./src/assets/hero-dashboard.jpg) showing the Swiss Escape itinerary, satellite route map, and budget breakdown.
  - **Foreground Scrapbook Collage**: Embedded [`hero-scrapbook.png`](./src/assets/hero-scrapbook.png) with botanical wildflower borders and handwritten *"Good Places, Better People ♥"* note.
- **Section 3: How It Works**: 4-step linear progression from destination choice to budget tracking.
- **Section 4: 10 Core Features UI/UX Showcase (`#features`)**:
  - Interactive 10-pill tab switcher.
  - Deep-dive panel with live mini-demos (Tactile schedule reorder sandbox, live OpenWeather city tester, interactive expense category donut, and live PostgreSQL telemetry).
- **Section 5: Curated Expeditions (`#destinations`)**: Cards highlighting curated destinations with seasonal weather and daily cost benchmarks.
- **Section 6: Route Intelligence Demo (`#optimizer`)**: Interactive sandbox demonstrating zero-backtracking waypoint optimization.
- **Section 7 & 8: Conversion CTA & Footer**.

---

### 2. `PlannerPage.jsx` ([Link](./src/pages/PlannerPage.jsx))
The primary trip planning workspace featuring 5 dynamic views and an interactive 3-panel split layout:

- **View 1: Canvas Studio (Split Workspace)**:
  - **Left Panel (Panel A — Navigation & Day Tabs)**: Day tabs (Day 1..Day N), places to visit counter, and view toggles (*Overview*, *Budget*, *Kanban Board*, *Journey Graph*, *Packing Checklist*).
  - **Center Panel (Panel B — Daily Itinerary Stream)**: Add places button, notes, recommended places chips carousel, authentic dining recommendations, and reorderable place cards with transit estimates.
  - **Right Panel (Panel C — Interactive Map & Route)**: Embedded Leaflet map with GPS coordinate markers, auto-bounding, custom category markers, and transit polylines.
- **View 2: Multi-Day Connected Journey Topology Graph ([`JourneyNodeGraph.jsx`](./src/components/JourneyNodeGraph.jsx))**:
  - Interactive dagre-style multi-day vector network connecting all scheduled days and unassigned places.
  - Real-time transit conduits (walking/driving times), day-to-day night bridges, and drag-and-drop reordering between days.
  - Pipeline Flow vs. Constellation Web layout switcher, smooth zoom/pan controls, and Route Metrics HUD.
- **View 3: Interactive Kanban Board**:
  - Multi-column daily board with drag-and-drop stop reordering, unassigned bucket, quick-move day badges (`D1`..`D7`), and smooth mouse grab-to-pan (`isPanningKanbanRef`).
- **View 4: Financial Radar & Budget Tracker**:
  - Chart.js expense distribution, multi-currency conversion, budget threshold alerts, and cost categorizer.
- **View 5: Smart Packing Checklist**:
  - Categorized luggage checklist with progress tracking and persistent state.

---

### 3. `BackendDashboardPage.jsx` ([Link](./src/pages/BackendDashboardPage.jsx))
The administrative and inspection hub for the PostgreSQL database and Spring Boot backend:
- Real-time connection status check for port 8080 and PostgreSQL 16.
- Trip CRUD operations: Create new trips, delete trips, and inspect stored activities.
