# TripMate UI Components Library (`src/components/`)

This directory houses the modular, reusable React UI components that power the TripMate workspace and planner.

---

## 🧩 Components Overview

| Component | Primary Function | Key Dependencies & Props |
| :--- | :--- | :--- |
| **`TripMap.jsx`** | Embedded Leaflet map rendering coordinate pins, popups, and route polylines. | `leaflet`, `react-leaflet`, `places`, `selectedPlace`, `onSelectPlace` |
| **`JourneyNodeGraph.jsx`** | Interactive topological node graph connecting all itinerary days with vector routes and transit HUD. | `trip`, `currencySymbol`, `currencyRate`, `onSelectPlace`, `onOpenOptimizer`, `onMovePlace` |
| **`PlaceCard.jsx`** | Individual activity / place card inside the itinerary stream with tags and notes. | `place`, `index`, `onEdit`, `onDelete`, `onOpenDetails` |
| **`PlaceDetailSheet.jsx`** | Slide-over drawer displaying high-res photos, address, operating hours, and notes. | `place`, `isOpen`, `onClose`, `onSaveNotes` |
| **`BudgetTracker.jsx`** | Interactive expense manager with category breakdown and currency selector. | `expenses`, `budgetLimit`, `currency`, `onAddExpense` |
| **`PackingChecklist.jsx`** | Interactive packing list with category filters (Essentials, Clothing, Gear, Tech). | `items`, `onToggleItem`, `onAddItem`, `onDeleteItem` |
| **`RouteOptimizerModal.jsx`** | Modal demonstrating route compression, distance savings, and zero-backtracking. | `waypoints`, `isOptimized`, `onOptimize`, `onClose` |
| **`AiAssistantModal.jsx`** | Conversational travel assistant suggesting hidden gems, dining, and daily pacing. | `destination`, `isOpen`, `onClose`, `onAddSuggestion` |
| **`AddExpenseModal.jsx`** | Form modal to add classified spending records (Sightseeing, Food, Transport, Lodging). | `isOpen`, `onClose`, `onSaveExpense`, `categories` |
| **`AddPlaceModal.jsx`** | Autocomplete modal to search and insert new attraction or restaurant stops. | `isOpen`, `onClose`, `onAddPlace`, `dayNumber` |
| **`ExportPdfModal.jsx`** | Formatter that packages the active itinerary into a printable or downloadable document. | `trip`, `activities`, `isOpen`, `onClose` |
| **`OnboardingTourModal.jsx`** | Step-by-step interactive walkthrough guiding first-time users through the workspace. | `isOpen`, `onComplete`, `currentStep` |

---

## 🔍 In-Depth Component Specifications

### 1. `TripMap.jsx`
- **Location**: [`src/components/TripMap.jsx`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/components/TripMap.jsx)
- **Features**:
  - Automatically calculates geographic bounding box (`map.fitBounds`) based on the active day's coordinates.
  - Custom SVG map markers with category colors (Green for Sightseeing, Amber for Dining, Blue for Transit).
  - Connects sequenced stops with smooth SVG polyline routes.
  - Interactive popup anchors with place titles, thumbnail images, and navigation buttons.

### 2. `JourneyNodeGraph.jsx`
- **Location**: [`src/components/JourneyNodeGraph.jsx`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/components/JourneyNodeGraph.jsx)
- **Features**:
  - **Multi-Day Topological Flow**: Connects all itinerary days in an interactive node-and-edge matrix.
  - **Dynamic Transit Conduits**: Computes Haversine geodesic distance between consecutive stops and estimates real transit modes (walking, driving, metro) with duration badges.
  - **Inter-Day Bridges**: Graceful overnight transitions connecting the conclusion of Day $N$ to the dawn of Day $N+1$.
  - **Dual Layout Engines**: Toggle between **Pipeline Flow** (chronological multi-day matrix) and **Constellation Web** (radial neural network).
  - **Zoom & Pan Canvas**: Smooth infinite-canvas zoom (`60%` to `180%`) and drag-to-pan exploration.
  - **Route Metrics HUD**: Real-time HUD displaying total waypoints, transit legs, total distance (km), estimated journey duration, and budget.
  - **Slide-Over Node Inspector**: Deep-dive sheet with cover imagery, address, AI sequence advisory, and one-click map transitions.

### 2. `BudgetTracker.jsx`
- **Location**: [`src/components/BudgetTracker.jsx`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/components/BudgetTracker.jsx)
- **Features**:
  - Displays total trip cost against a customizable budget threshold.
  - Progress bar dynamically transitions to warning colors if spending exceeds 90% of budget.
  - Multi-currency support (USD `$`, EUR `€`, GBP `£`, CHF `CHF`, INR `₹`, JPY `¥`).
  - Categorized cost breakdown table with one-click deletion and filtering.

### 3. `PackingChecklist.jsx`
- **Location**: [`src/components/PackingChecklist.jsx`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/components/PackingChecklist.jsx)
- **Features**:
  - Categorized checklists: *Documents & Money*, *Clothing & Wear*, *Electronics & Tech*, *Toiletries*, *Outdoor Gear*.
  - Live progress meter tracking percentage of packed items.
  - Custom item input with immediate local state persistence.

### 4. `RouteOptimizerModal.jsx`
- **Location**: [`src/components/RouteOptimizerModal.jsx`](file:///c:/Users/Joe/Projects/Trip%20Planner%20Wanderlog/src/components/RouteOptimizerModal.jsx)
- **Features**:
  - Displays side-by-side comparison: *Original Route* vs. *Optimized Route*.
  - Highlights calculated distance delta (`-64.6 km saved`) and transit duration reduction (`36% less driving`).
  - Single-click application that immediately updates the itinerary sequence across all panels.
