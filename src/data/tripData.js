export const initialTripData = {
  title: "Trip to Paris",
  dates: "10/12 - 10/13",
  startDate: "10/12",
  endDate: "10/13",
  author: "You",
  destination: "Paris, France",
  currency: "₹", // Supports switching to € or $
  budget: 0,
  center: [48.8606, 2.3376],

  // 1. Unscheduled bucket: "Places to visit" (Exact match for Screenshot 2 & 5)
  placesToVisit: [
    {
      id: "p-1",
      number: 1,
      name: "Louvre Museum",
      subtitle: "Closed Tue • Former historic palace housing huge art collection, from Roman sculptures to da Vinci's Mona Lisa.",
      bookingWarning: "Consider booking ahead",
      category: "Art Museum",
      categories: ["Art museum", "Museum", "Historic Palace"],
      rating: 4.7,
      reviewsCount: 246980,
      coords: [48.8606, 2.3376],
      image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&auto=format&fit=crop&q=80",
      description: "Former historic palace housing huge art collection, from Roman sculptures to da Vinci's Mona Lisa. Spread over 72,000 square meters across the Denon, Richelieu, and Sully wings.",
      address: "Rue de Rivoli, 75001 Paris, France",
      phone: "+33 1 40 20 50 50",
      website: "https://www.louvre.fr",
      duration: "People typically spend 3 hr to 5 hr here",
      cost: 22,
      expenseCategory: "Attractions",
      visited: false
    },
    {
      id: "p-2",
      number: 2,
      name: "Stade de France",
      subtitle: "From the web: All-seater 81,000-capacity sports stadium used for international football & rugby games, plus concerts.",
      bookingWarning: "Consider booking ahead",
      category: "Stadium & Arena",
      categories: ["Sports stadium", "Stadium", "Concert Venue"],
      rating: 4.5,
      reviewsCount: 38240,
      coords: [48.9244, 2.3601],
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
      description: "From the web: All-seater 81,000-capacity sports stadium used for international football & rugby games, plus concerts. Iconic home of French national team rugby and football.",
      address: "93200 Saint-Denis, France",
      phone: "+33 1 55 93 00 00",
      website: "https://www.stadefrance.com",
      duration: "People typically spend 2 hr to 3 hr here",
      cost: 35,
      expenseCategory: "Attractions",
      visited: false
    },
    {
      id: "p-3",
      number: 3,
      name: "Musée de l'Air et de l'Espace",
      subtitle: "Closed Mon • Indoor & outdoor aeronautical & space museum with displays including flight simulator & rockets.",
      category: "Science Museum",
      categories: ["Science museum", "Museum", "Specialty Museums"],
      rating: 4.6,
      reviewsCount: 10797,
      coords: [48.9472, 2.4353],
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80",
      description: "Located just a few kilometers from Paris, the Museum of Air and Space is one of the oldest aviation museums in the world, dedicated to preserving and celebrating the rich history of aerospace innovation. It features extensive indoor and outdoor exhibits, original Concorde aircraft, and interactive flight simulators.",
      address: "Aeroport de Paris-Le Bourget, 93352 Le Bourget, France",
      phone: "+33 1 49 92 70 00",
      website: "https://www.museeairespace.fr",
      duration: "People typically spend 2 hr to 4 hr here",
      cost: 17,
      expenseCategory: "Attractions",
      visited: false
    }
  ],

  // 2. Custom sub-lists (Screenshot 3)
  customLists: [
    {
      id: "custom-list-1",
      title: "Add a title (e.g., \"Restaurants\")",
      places: []
    }
  ],

  // 3. Day-by-day Itinerary (Screenshot 3)
  sections: [
    {
      id: "day-1",
      title: "Monday, October 12th",
      shortTitle: "Mon 10/12",
      dateStr: "Monday, October 12th",
      color: "#2563eb",
      places: [
        {
          id: "itin-1",
          number: 1,
          name: "Notre-Dame Cathedral",
          subtitle: "Historic medieval Catholic cathedral on the Île de la Cité.",
          category: "Cathedral & Monument",
          categories: ["Cathedral", "Monument", "Historic Site"],
          rating: 4.8,
          reviewsCount: 185000,
          coords: [48.852968, 2.349902],
          image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80",
          description: "Medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. Famous for its French Gothic architecture and gargoyles.",
          address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris",
          phone: "+33 1 42 34 56 10",
          website: "https://www.notredamedeparis.fr",
          duration: "People typically spend 1 hr to 2 hr here",
          cost: 0,
          expenseCategory: "Attractions",
          visited: false
        },
        {
          id: "itin-2",
          number: 2,
          name: "Sainte-Chapelle",
          subtitle: "Gothic royal chapel with 1,113 stained glass windows depicting biblical history.",
          category: "Gothic Chapel",
          categories: ["Chapel", "Monument", "Art & Architecture"],
          rating: 4.8,
          reviewsCount: 42000,
          coords: [48.8554, 2.3450],
          image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80",
          description: "Royal chapel in the Gothic style within the medieval Palais de la Cité, the residence of the Kings of France until the 14th century.",
          address: "10 Bd du Palais, 75001 Paris",
          phone: "+33 1 53 40 60 80",
          website: "https://www.sainte-chapelle.fr",
          duration: "People typically spend 1 hr to 1.5 hr here",
          cost: 13,
          expenseCategory: "Attractions",
          visited: false
        }
      ]
    },
    {
      id: "day-2",
      title: "Tuesday, October 13th",
      shortTitle: "Tue 10/13",
      dateStr: "Tuesday, October 13th",
      color: "#059669",
      places: [
        {
          id: "itin-3",
          number: 1,
          name: "Eiffel Tower",
          subtitle: "Iconic wrought-iron lattice tower on the Champ de Mars.",
          category: "Monument",
          categories: ["Monument", "Landmark", "Observation Deck"],
          rating: 4.7,
          reviewsCount: 340000,
          coords: [48.858370, 2.294481],
          image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop&q=80",
          description: "Locally nicknamed 'La dame de fer', built from 1887 to 1889 by Gustave Eiffel's engineering company for the 1889 World's Fair.",
          address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
          phone: "+33 892 70 12 39",
          website: "https://www.toureiffel.paris",
          duration: "People typically spend 2 hr to 3 hr here",
          cost: 28,
          expenseCategory: "Attractions",
          visited: false
        }
      ]
    }
  ]
};
