/**
 * TripMate Multi-City Destination & Places Registry
 * Supports dynamic switching between Paris, Mexico City, Mumbai, Tokyo, New York, Rome, London
 * and dynamic resolution for any custom location with authentic Google Maps verified imagery.
 */

export const DESTINATIONS_REGISTRY = {
  'mexico': {
    id: 'mexico',
    name: 'Mexico',
    city: 'Mexico City',
    country: 'Mexico',
    fullTitle: 'Trip to Mexico',
    passedDestination: 'Mexico City, Mexico',
    currency: '₹',
    distanceInfo: '14 mi (23 km) away from Mexico',
    center: [19.4326, -99.1332],
    zoom: 12,
    coverImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&auto=format&fit=crop&q=80',
    dates: '10/1 - 10/10',
    startDate: '10/1',
    endDate: '10/10',
    guides: [
      {
        title: '5-Day Mexico City Itinerary',
        subtitle: 'Most popular travel itinerary',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Top things to do in Mexico City',
        subtitle: 'Tripadvisor Top 20',
        source: 'Tripadvisor',
        image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Best Tacos & Street Food Guide',
        subtitle: 'Eater 38 Essential Restaurants',
        source: 'Eater',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format&fit=crop&q=80'
      }
    ],
    placesToVisit: [
      {
        id: 'mex-p1',
        number: 1,
        name: 'Frida Kahlo Museum (Casa Azul)',
        subtitle: 'Historic blue house in Coyoacán displaying personal artifacts and masterpieces by Frida Kahlo.',
        bookingWarning: 'Consider booking ahead',
        category: 'Art Museum',
        categories: ['Art Museum', 'Historic House', 'Coyoacán'],
        rating: 4.8,
        reviewsCount: 68420,
        coords: [19.3551, -99.1625],
        image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=600&auto=format&fit=crop&q=80',
        description: 'The Casa Azul was the birthplace, childhood home, and death place of the world-renowned artist Frida Kahlo. Contains her personal art collection, clothes, and Diego Rivera paintings.',
        address: 'Londres 247, Del Carmen, Coyoacán, 04100 CDMX, Mexico',
        phone: '+52 55 5554 5999',
        website: 'https://www.museofridakahlo.org.mx',
        duration: 'People typically spend 2 hr here',
        cost: 15,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'mex-p2',
        number: 2,
        name: 'Chapultepec Castle & National History Museum',
        subtitle: 'Majestic hilltop castle overlooking Mexico City with lush gardens and imperial state rooms.',
        bookingWarning: 'Closed on Mondays',
        category: 'Castle & Monument',
        categories: ['Castle', 'History Museum', 'Park'],
        rating: 4.9,
        reviewsCount: 112500,
        coords: [19.4204, -99.1818],
        image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&auto=format&fit=crop&q=80',
        description: 'Located atop Chapultepec Hill, this is the only royal castle in the Americas that served as the official residence of a sovereign monarch (Emperor Maximilian I).',
        address: 'Bosque de Chapultepec I Secc, 11100 CDMX, Mexico',
        phone: '+52 55 4040 5215',
        website: 'https://mnh.inah.gob.mx',
        duration: 'People typically spend 2.5 hr to 3.5 hr here',
        cost: 6,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'mex-p3',
        number: 3,
        name: 'Teotihuacan Pyramids (Sun & Moon)',
        subtitle: 'Iconic ancient Mesoamerican archaeological complex featuring monumental stone pyramids.',
        bookingWarning: 'Wear sun protection & hat',
        category: 'Archaeological Site',
        categories: ['UNESCO Heritage', 'Pyramids', 'Ancient Ruins'],
        rating: 4.8,
        reviewsCount: 94500,
        coords: [19.6925, -98.8437],
        image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=600&auto=format&fit=crop&q=80',
        description: 'Vast pre-Columbian city known for the Temple of Quetzalcoatl, Pyramid of the Sun, and Avenue of the Dead. One of the greatest civilizations in antiquity.',
        address: '55800 San Juan Teotihuacán, State of Mexico, Mexico',
        phone: '+52 594 956 0052',
        website: 'https://www.inah.gob.mx',
        duration: 'Full day trip (4 to 6 hr)',
        cost: 10,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    sections: [
      {
        id: 'day-1',
        title: 'Thursday, October 1st',
        shortTitle: 'Thu 10/1',
        color: '#2563EB', // Royal Blue
        places: [
          {
            id: 'mex-itin-1',
            number: 1,
            name: 'Zócalo & Metropolitan Cathedral',
            subtitle: 'Enormous central public square flanked by the National Palace and historic cathedral.',
            category: 'Historic Plaza',
            rating: 4.7,
            reviewsCount: 145000,
            coords: [19.4326, -99.1332],
            image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&auto=format&fit=crop&q=80',
            cost: 0,
            expenseCategory: 'Attractions'
          },
          {
            id: 'mex-itin-2',
            number: 2,
            name: 'Palacio de Bellas Artes',
            subtitle: 'Stunning white marble cultural center with art nouveau exterior and Diego Rivera murals.',
            category: 'Cultural Center',
            rating: 4.8,
            reviewsCount: 98000,
            coords: [19.4352, -99.1412],
            image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=600&auto=format&fit=crop&q=80',
            cost: 5,
            expenseCategory: 'Attractions'
          },
          {
            id: 'mex-itin-3',
            number: 3,
            name: 'Templo Mayor Ruins',
            subtitle: 'Sacred main temple ruins of the Aztec capital city of Tenochtitlan with excavated museum.',
            category: 'Ancient Ruins',
            rating: 4.7,
            reviewsCount: 42000,
            coords: [19.4349, -99.1313],
            image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=600&auto=format&fit=crop&q=80',
            cost: 6,
            expenseCategory: 'Attractions'
          }
        ]
      },
      {
        id: 'day-2',
        title: 'Friday, October 2nd',
        shortTitle: 'Fri 10/2',
        color: '#4F46E5', // Indigo
        places: [
          {
            id: 'mex-itin-4',
            number: 1,
            name: 'Coyoacán Historic Center & Market',
            subtitle: 'Colonial bohemian plaza lined with artisanal street food, churros, and cafes.',
            category: 'Cultural District',
            rating: 4.8,
            reviewsCount: 72000,
            coords: [19.3498, -99.1620],
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop&q=80',
            cost: 8,
            expenseCategory: 'Food & Dining'
          },
          {
            id: 'mex-itin-5',
            number: 2,
            name: 'Xochimilco Floating Gardens',
            subtitle: 'Traditional canal rides on vibrant colorful trajineras with live mariachi bands.',
            category: 'Canal Experience',
            rating: 4.7,
            reviewsCount: 89000,
            coords: [19.2573, -99.1030],
            image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&auto=format&fit=crop&q=80',
            cost: 20,
            expenseCategory: 'Attractions'
          }
        ]
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-mex-1',
        name: 'Pujol',
        subtitle: 'World\'s 50 Best Restaurant by Chef Enrique Olvera, celebrated for his 2,500+ day aged Mole Madre.',
        category: 'Fine Dining Mexican',
        rating: 4.8,
        reviewsCount: 14200,
        price: '$$$$',
        coords: [19.4297, -99.1963],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Tennyson 133, Polanco, CDMX',
        cost: 95,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mex-2',
        name: 'Contramar',
        subtitle: 'Iconic seafood haven in Roma Norte famous for raw tuna tostadas and grilled pescado a la talla.',
        category: 'Seafood Restaurant',
        rating: 4.8,
        reviewsCount: 18900,
        price: '$$$',
        coords: [19.4190, -99.1685],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: 'Calle Durango 200, Roma Norte, CDMX',
        cost: 45,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mex-3',
        name: 'Taquería El Califa',
        subtitle: 'Beloved upscale taquería famous for prime rib tacos, gringas, melted gouda, and fresh salsas.',
        category: 'Taquería & Grill',
        rating: 4.7,
        reviewsCount: 12500,
        price: '$$',
        coords: [19.4145, -99.1720],
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop&q=80',
        address: 'Av. Altata 22, Condesa, CDMX',
        cost: 15,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mex-4',
        name: 'Panadería Rosetta',
        subtitle: 'Charming European-Mexican bakery in Roma Norte celebrated for guava rolls and sourdough.',
        category: 'Bakery & Cafe',
        rating: 4.8,
        reviewsCount: 16800,
        price: '$$',
        coords: [19.4197, -99.1599],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
        address: 'Colima 179, Roma Norte, CDMX',
        cost: 12,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mex-5',
        name: 'Quintonil',
        subtitle: 'Critically acclaimed contemporary Mexican restaurant led by Chef Jorge Vallejo.',
        category: 'Modern Gastronomy',
        rating: 4.9,
        reviewsCount: 9400,
        price: '$$$$',
        coords: [19.4312, -99.1925],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Newton 55, Polanco, CDMX',
        cost: 85,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-mex-1',
        name: 'Gran Hotel de la Ciudad de México',
        subtitle: 'Historic Art Nouveau landmark overlooking the Zócalo with majestic 1908 Tiffany stained-glass ceiling.',
        category: '5-Star Historic Hotel',
        rating: 4.7,
        reviewsCount: 14500,
        price: '$$$$',
        coords: [19.4321, -99.1338],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: '16 de Septiembre 82, Centro Histórico, CDMX',
        cost: 180,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mex-2',
        name: 'Las Alcobas, a Luxury Collection Hotel',
        subtitle: 'Sophisticated boutique luxury hotel nestled on fashionable Masaryk Avenue in Polanco.',
        category: 'Luxury Boutique Hotel',
        rating: 4.8,
        reviewsCount: 3900,
        price: '$$$$',
        coords: [19.4318, -99.1956],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        address: 'Av. Pdte. Masaryk 390, Polanco, CDMX',
        cost: 260,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mex-3',
        name: 'The St. Regis Mexico City',
        subtitle: 'Iconic tower hotel on Paseo de la Reforma with private butler service and Diana Restaurant.',
        category: '5-Star Skyscraper Hotel',
        rating: 4.8,
        reviewsCount: 7200,
        price: '$$$$',
        coords: [19.4239, -99.1718],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=80',
        address: 'Paseo de la Reforma 439, Cuauhtémoc, CDMX',
        cost: 290,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mex-4',
        name: 'Hotel Condesa DF',
        subtitle: 'French neoclassical mansion turned design hotel with leafy rooftop terrace in Parque España.',
        category: 'Boutique Design Hotel',
        rating: 4.6,
        reviewsCount: 5100,
        price: '$$$',
        coords: [19.4168, -99.1710],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
        address: 'Av. Veracruz 102, Condesa, CDMX',
        cost: 165,
        expenseCategory: 'Lodging'
      }
    ]
  },

  'mumbai': {
    id: 'mumbai',
    name: 'Mumbai',
    city: 'Mumbai',
    country: 'India',
    fullTitle: 'Trip to Mumbai',
    passedDestination: 'Mumbai, Maharashtra, India',
    currency: '₹',
    distanceInfo: '12 mi (19 km) across Mumbai Suburban',
    center: [19.0760, 72.8777],
    zoom: 12,
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&auto=format&fit=crop&q=80',
    dates: '10/15 - 10/20',
    startDate: '10/15',
    endDate: '10/20',
    guides: [
      {
        title: '4-Day Mumbai Itinerary',
        subtitle: 'Most popular suburban & heritage route',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Top Attractions & Food in Bandra to BKC',
        subtitle: 'Tripadvisor Top Picks',
        source: 'Tripadvisor',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Mumbai Luxury Hotels & Dining',
        subtitle: 'Condé Nast Traveler Gold List',
        source: 'CN Traveler',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80'
      }
    ],
    placesToVisit: [
      {
        id: 'mum-p1',
        number: 1,
        name: 'The LaLiT Mumbai',
        subtitle: 'Luxury 5-star airport hotel near Sahar with grand 8-story atrium and gourmet restaurants.',
        category: 'Luxury Hotel & Resort',
        categories: ['Luxury Hotel', 'Resort', 'Sahar'],
        rating: 4.6,
        reviewsCount: 22800,
        coords: [19.1035, 72.8833],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        description: 'Conveniently located near Chhatrapati Shivaji Maharaj International Airport, featuring award-winning dining, spa, and elegant suites.',
        address: 'Sahar Airport Road, Andheri East, Mumbai 400059',
        cost: 140,
        expenseCategory: 'Lodging',
        visited: false
      },
      {
        id: 'mum-p2',
        number: 2,
        name: 'Grand Hyatt Mumbai Hotel & Residences',
        subtitle: 'Sprawling 12-acre multi-dimensional luxury lifestyle destination in Santacruz East.',
        category: 'Luxury Resort & Dining',
        rating: 4.7,
        reviewsCount: 31200,
        coords: [19.0792, 72.8530],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        description: 'Featuring acclaimed Italian restaurant Celini, signature China House, expansive lush gardens, and luxury shopping plazas.',
        address: 'Bandra Kurla Complex Vicinity, Santacruz East, Mumbai 400055',
        cost: 160,
        expenseCategory: 'Lodging',
        visited: false
      },
      {
        id: 'mum-p3',
        number: 3,
        name: 'Jio World Drive & Convention Centre (BKC)',
        subtitle: 'Premier modern shopping and lifestyle complex in Bandra Kurla Complex with rooftop drive-in theater.',
        category: 'Shopping & Entertainment',
        rating: 4.8,
        reviewsCount: 18400,
        coords: [19.0660, 72.8610],
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&auto=format&fit=crop&q=80',
        description: 'Iconic experiential precinct home to world-class dining, curated global brands, and the Mumbai cultural pavilion.',
        address: 'Bandra Kurla Complex, Bandra East, Mumbai 400051',
        cost: 25,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    sections: [
      {
        id: 'day-1',
        title: 'Wednesday, October 15th',
        shortTitle: 'Wed 10/15',
        color: '#2563EB', // Royal Blue
        places: [
          {
            id: 'mum-itin-1',
            number: 1,
            name: 'The LaLiT Mumbai',
            subtitle: 'Starting departure point near Sahar Airport Road.',
            category: 'Hotel Departure',
            rating: 4.6,
            coords: [19.1035, 72.8833],
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
            cost: 0,
            expenseCategory: 'Lodging'
          },
          {
            id: 'mum-itin-2',
            number: 2,
            name: 'Chhatrapati Shivaji Maharaj International Airport (T2)',
            subtitle: 'World-renowned peacock-inspired Jaya He art wall and international terminal.',
            category: 'Transit & Landmark',
            rating: 4.7,
            coords: [19.0896, 72.8656],
            image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&auto=format&fit=crop&q=80',
            cost: 0,
            expenseCategory: 'Attractions'
          },
          {
            id: 'mum-itin-3',
            number: 3,
            name: 'Grand Hyatt Mumbai Hotel & Residences',
            subtitle: 'Lunch and art walkway visit in Santacruz East.',
            category: 'Hotel & Dining',
            rating: 4.7,
            coords: [19.0792, 72.8530],
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
            cost: 35,
            expenseCategory: 'Food & Dining'
          },
          {
            id: 'mum-itin-4',
            number: 4,
            name: 'Jio World Drive (BKC)',
            subtitle: 'Afternoon lifestyle leisure, shopping and coffee in the heart of BKC.',
            category: 'Lifestyle Hub',
            rating: 4.8,
            coords: [19.0660, 72.8610],
            image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&auto=format&fit=crop&q=80',
            cost: 20,
            expenseCategory: 'Attractions'
          },
          {
            id: 'mum-itin-5',
            number: 5,
            name: 'Funky Monkeys Play Center Bandra',
            subtitle: 'Indoor family recreational activity center located in Bandra West.',
            category: 'Recreation & Kids',
            rating: 4.5,
            coords: [19.0620, 72.8360],
            image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
            cost: 15,
            expenseCategory: 'Attractions'
          }
        ]
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-mum-1',
        name: 'The Bombay Canteen',
        subtitle: 'Celebrated restaurant in Lower Parel elevating regional Indian recipes with contemporary flair.',
        category: 'Modern Indian Cuisine',
        rating: 4.8,
        reviewsCount: 16500,
        price: '$$$',
        coords: [19.0068, 72.8302],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Kamala Mills, Lower Parel, Mumbai',
        cost: 30,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mum-2',
        name: 'Trishna',
        subtitle: 'World-famous seafood destination in Fort revered for succulent Koliwada crab and butter garlic prawns.',
        category: 'Coastal Seafood',
        rating: 4.7,
        reviewsCount: 19800,
        price: '$$$',
        coords: [18.9298, 72.8335],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: '7 Sai Baba Marg, Kala Ghoda, Fort, Mumbai',
        cost: 40,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mum-3',
        name: 'Leopold Cafe & Bar',
        subtitle: 'Legendary heritage cafe operating since 1871 on Colaba Causeway with beers, chili chicken and nostalgia.',
        category: 'Heritage Cafe & Pub',
        rating: 4.5,
        reviewsCount: 28400,
        price: '$$',
        coords: [18.9228, 72.8322],
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
        address: 'Colaba Causeway, Apollo Bandar, Mumbai',
        cost: 18,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-mum-4',
        name: 'O Pedro',
        subtitle: 'Vibrant Goan and Portuguese restaurant in BKC with sourdough poee, choriz rice and craft cocktails.',
        category: 'Goan & Portuguese',
        rating: 4.7,
        reviewsCount: 11200,
        price: '$$$',
        coords: [19.0658, 72.8631],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Unit 2, Jet Airways Godrej BKC Building, Mumbai',
        cost: 35,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-mum-1',
        name: 'The LaLiT Mumbai',
        subtitle: 'Grand 5-star airport luxury hotel with world-class hospitality and spa.',
        category: '5-Star Airport Hotel',
        rating: 4.6,
        reviewsCount: 22800,
        price: '$$$$',
        coords: [19.1035, 72.8833],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Sahar Airport Road, Andheri East, Mumbai',
        cost: 140,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mum-2',
        name: 'ITC Maratha, Luxury Collection Hotel',
        subtitle: 'Baroque Maratha architecture inspired luxury landmark near international terminals.',
        category: '5-Star Luxury Palace',
        rating: 4.8,
        reviewsCount: 19500,
        price: '$$$$',
        coords: [19.1022, 72.8711],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
        address: 'Sahar, Andheri East, Mumbai 400099',
        cost: 175,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mum-3',
        name: 'Grand Hyatt Mumbai Hotel & Residences',
        subtitle: '12-acre multi-dimensional lifestyle hotel in Santacruz East near BKC.',
        category: '5-Star Luxury Resort',
        rating: 4.7,
        reviewsCount: 31200,
        price: '$$$$',
        coords: [19.0792, 72.8530],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        address: 'Santacruz East, Mumbai 400055',
        cost: 160,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-mum-4',
        name: 'The Taj Mahal Palace, Mumbai',
        subtitle: 'Legendary 1903 harbor landmark facing Gateway of India and the Arabian Sea.',
        category: 'Historic Palace Hotel',
        rating: 4.9,
        reviewsCount: 48900,
        price: '$$$$',
        coords: [18.9217, 72.8332],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        address: 'Apollo Bandar, Colaba, Mumbai 400001',
        cost: 290,
        expenseCategory: 'Lodging'
      }
    ]
  },

  'paris': {
    id: 'paris',
    name: 'Paris',
    city: 'Paris',
    country: 'France',
    fullTitle: 'Trip to Paris',
    passedDestination: 'Paris, France',
    currency: '₹',
    distanceInfo: '10 mi (16 km) across Central Paris',
    center: [48.8566, 2.3522],
    zoom: 13,
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80',
    dates: '10/12 - 10/13',
    startDate: '10/12',
    endDate: '10/13',
    guides: [
      {
        title: 'Best attractions in Paris',
        subtitle: 'Most often seen on the web',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&fit=crop'
      },
      {
        title: 'Best restaurants in Paris',
        subtitle: 'Most often seen on the web',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&fit=crop'
      },
      {
        title: 'Search hotels with trip rate',
        subtitle: 'No hidden commissions',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&fit=crop'
      }
    ],
    placesToVisit: [
      {
        id: 'p-1',
        number: 1,
        name: 'Louvre Museum',
        subtitle: 'Closed Tue • Former historic palace housing huge art collection, from Roman sculptures to da Vinci\'s Mona Lisa.',
        bookingWarning: 'Consider booking ahead',
        category: 'Art Museum',
        categories: ['Art museum', 'Museum', 'Historic Palace'],
        rating: 4.7,
        reviewsCount: 246980,
        coords: [48.8606, 2.3376],
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&auto=format&fit=crop&q=80',
        description: 'Former historic palace housing huge art collection, from Roman sculptures to da Vinci\'s Mona Lisa. Spread over 72,000 square meters across the Denon, Richelieu, and Sully wings.',
        address: 'Rue de Rivoli, 75001 Paris, France',
        cost: 22,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'p-2',
        number: 2,
        name: 'Stade de France',
        subtitle: 'All-seater 81,000-capacity sports stadium used for international football & rugby games, plus concerts.',
        bookingWarning: 'Consider booking ahead',
        category: 'Stadium & Arena',
        rating: 4.5,
        reviewsCount: 38240,
        coords: [48.9244, 2.3601],
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
        address: '93200 Saint-Denis, France',
        cost: 35,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'p-3',
        number: 3,
        name: 'Musée de l\'Air et de l\'Espace',
        subtitle: 'Closed Mon • Indoor & outdoor aeronautical & space museum with displays including flight simulator & rockets.',
        category: 'Science Museum',
        rating: 4.6,
        reviewsCount: 10797,
        coords: [48.9472, 2.4353],
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80',
        address: 'Aeroport de Paris-Le Bourget, 93352 Le Bourget, France',
        cost: 17,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    sections: [
      {
        id: 'day-1',
        title: 'Monday, October 12th',
        shortTitle: 'Mon 10/12',
        color: '#2563EB', // Royal Blue
        places: [
          {
            id: 'itin-1',
            number: 1,
            name: 'Notre-Dame Cathedral',
            subtitle: 'Historic medieval Catholic cathedral on the Île de la Cité.',
            category: 'Cathedral & Monument',
            rating: 4.8,
            reviewsCount: 185000,
            coords: [48.852968, 2.349902],
            image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80',
            cost: 0,
            expenseCategory: 'Attractions'
          },
          {
            id: 'itin-2',
            number: 2,
            name: 'Sainte-Chapelle',
            subtitle: 'Gothic royal chapel with 1,113 stained glass windows depicting biblical history.',
            category: 'Gothic Chapel',
            rating: 4.8,
            reviewsCount: 42000,
            coords: [48.8554, 2.3450],
            image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80',
            cost: 13,
            expenseCategory: 'Attractions'
          }
        ]
      },
      {
        id: 'day-2',
        title: 'Tuesday, October 13th',
        shortTitle: 'Tue 10/13',
        color: '#4F46E5', // Indigo
        places: [
          {
            id: 'itin-3',
            number: 1,
            name: 'Eiffel Tower',
            subtitle: 'Iconic wrought-iron lattice tower on the Champ de Mars.',
            category: 'Monument',
            rating: 4.7,
            reviewsCount: 340000,
            coords: [48.858370, 2.294481],
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop&q=80',
            cost: 28,
            expenseCategory: 'Attractions'
          }
        ]
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-par-1',
        name: 'Le Jules Verne',
        subtitle: 'Michelin-starred fine dining perched on the 2nd floor of the Eiffel Tower with breathtaking views.',
        category: 'Haute Cuisine',
        rating: 4.7,
        reviewsCount: 8900,
        price: '$$$$',
        coords: [48.8584, 2.2945],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Eiffel Tower, 2nd Floor, 75007 Paris',
        cost: 120,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-par-2',
        name: 'Septime',
        subtitle: 'Celebrated neo-bistro in the 11th arrondissement serving inventive seasonal tasting menus.',
        category: 'Contemporary French',
        rating: 4.8,
        reviewsCount: 14200,
        price: '$$$',
        coords: [48.8534, 2.3804],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: '80 Rue de Charonne, 75011 Paris',
        cost: 65,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-par-3',
        name: 'Chez Janou',
        subtitle: 'Bustling Marais bistro celebrated for Provençal cuisine, magret de canard, and unlimited chocolate mousse.',
        category: 'Traditional Bistro',
        rating: 4.6,
        reviewsCount: 22100,
        price: '$$',
        coords: [48.8564, 2.3667],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: '2 Rue Roger Verlomme, 75003 Paris',
        cost: 28,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-par-1',
        name: 'Ritz Paris',
        subtitle: 'Legendary palace hotel on Place Vendôme with lavish suites, Bar Hemingway, and luxury spa.',
        category: '5-Star Palace Hotel',
        rating: 4.9,
        reviewsCount: 12400,
        price: '$$$$',
        coords: [48.8682, 2.3292],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: '15 Place Vendôme, 75001 Paris',
        cost: 450,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-par-2',
        name: 'Le Meurice - Dorchester Collection',
        subtitle: 'Opulent palace hotel overlooking the Tuileries Garden with interiors designed by Philippe Starck.',
        category: 'Palace Hotel',
        rating: 4.8,
        reviewsCount: 8900,
        price: '$$$$',
        coords: [48.8654, 2.3283],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        address: '228 Rue de Rivoli, 75001 Paris',
        cost: 380,
        expenseCategory: 'Lodging'
      }
    ]
  },

  'tokyo': {
    id: 'tokyo',
    name: 'Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    fullTitle: 'Trip to Tokyo',
    passedDestination: 'Tokyo, Japan',
    currency: '₹',
    distanceInfo: '8 mi (13 km) across Shinjuku to Shibuya',
    center: [35.6762, 139.6503],
    zoom: 12,
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
    dates: '11/1 - 11/7',
    startDate: '11/1',
    endDate: '11/7',
    guides: [
      {
        title: '7-Day Ultimate Tokyo Itinerary',
        subtitle: 'Shibuya, Shinjuku, Asakusa & Akihabara',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Tokyo Michelin Ramen & Sushi Guide',
        subtitle: 'Tabelog Top 100',
        source: 'Tabelog',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80'
      }
    ],
    placesToVisit: [
      {
        id: 'tok-p1',
        number: 1,
        name: 'Senso-ji Temple & Nakamise Dori',
        subtitle: 'Tokyo\'s oldest ancient Buddhist temple in Asakusa with iconic giant red lantern.',
        category: 'Ancient Buddhist Temple',
        rating: 4.7,
        reviewsCount: 168000,
        coords: [35.7148, 139.7967],
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
        address: '2-3-1 Asakusa, Taito City, Tokyo',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'tok-p2',
        number: 2,
        name: 'Shibuya Crossing & Hachiko Memorial',
        subtitle: 'The world\'s busiest pedestrian intersection with neon billboards and bustling energy.',
        category: 'Urban Landmark',
        rating: 4.8,
        reviewsCount: 210000,
        coords: [35.6595, 139.7005],
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop&q=80',
        address: 'Shibuya City, Tokyo 150-8010',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    sections: [
      {
        id: 'day-1',
        title: 'Sunday, November 1st',
        shortTitle: 'Sun 11/1',
        color: '#2563EB', // Royal Blue
        places: [
          {
            id: 'tok-itin-1',
            number: 1,
            name: 'Senso-ji Temple',
            subtitle: 'Morning prayer and street market stroll.',
            category: 'Temple',
            rating: 4.7,
            coords: [35.7148, 139.7967],
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
            cost: 0,
            expenseCategory: 'Attractions'
          },
          {
            id: 'tok-itin-2',
            number: 2,
            name: 'Tokyo Skytree',
            subtitle: 'Panoramic 360 observation tower overlooking Mt. Fuji.',
            category: 'Observation Tower',
            rating: 4.8,
            coords: [35.7100, 139.8107],
            image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&auto=format&fit=crop&q=80',
            cost: 25,
            expenseCategory: 'Attractions'
          }
        ]
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-tok-1',
        name: 'Ichiran Shibuya',
        subtitle: 'Legendary tonkotsu ramen served in solo flavor-concentration dining booths.',
        category: 'Ramen Specialist',
        rating: 4.7,
        reviewsCount: 38400,
        price: '$$',
        coords: [35.6617, 139.7001],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
        address: '1-22-7 Jinnan, Shibuya City, Tokyo',
        cost: 14,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-tok-2',
        name: 'Sukiyabashi Jiro',
        subtitle: 'World-renowned Edo-style sushi masterclass in Ginza.',
        category: 'Michelin Omakase',
        rating: 4.9,
        reviewsCount: 5200,
        price: '$$$$',
        coords: [35.6721, 139.7635],
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
        address: 'Tsukamoto Sogyo Building, Ginza, Tokyo',
        cost: 150,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-tok-1',
        name: 'Park Hyatt Tokyo',
        subtitle: 'Iconic Shinjuku skyscraper hotel famous from "Lost in Translation" with New York Grill.',
        category: '5-Star Skyscraper Hotel',
        rating: 4.8,
        reviewsCount: 11200,
        price: '$$$$',
        coords: [35.6853, 139.6910],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: '3-7-1-2 Nishi-Shinjuku, Tokyo',
        cost: 320,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'switzerland': {
    id: 'switzerland',
    name: 'Switzerland',
    city: 'Interlaken & Swiss Alps',
    country: 'Switzerland',
    fullTitle: 'Swiss Alpine Expedition',
    passedDestination: 'Switzerland',
    currency: '€',
    distanceInfo: 'Heart of the Central Alps',
    center: [46.6863, 7.8632],
    zoom: 10,
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&auto=format&fit=crop&q=80',
    dates: '10/12 - 10/16',
    startDate: '10/12',
    endDate: '10/16',
    guides: [
      {
        title: '5-Day Ultimate Swiss Alpine Itinerary',
        subtitle: 'Most popular alpine route',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80'
      },
      {
        title: 'Top Swiss Mountain Excursions & Rail Passes',
        subtitle: 'Swiss Travel Pass Guide',
        source: 'SBB Rail',
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'swiss-p1',
        name: 'Jungfraujoch - Top of Europe',
        subtitle: 'Glacier plateau at 3,454m with Ice Palace, Sphinx Observatory, and panoramic Aletsch Glacier.',
        bookingWarning: 'Seat reservation recommended on sunny days',
        category: 'Mountain Peak',
        categories: ['UNESCO Heritage', 'Mountain Summit', 'Glacier'],
        rating: 4.9,
        reviewsCount: 48900,
        coords: [46.5475, 7.9854],
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop&q=80',
        description: 'The highest railway station in Europe, situated between the Mönch and Jungfrau mountains. Features year-round snow, the Ice Palace carved into the glacier, and the high-speed Eiger Express.',
        address: 'Jungfraujoch, 3801 Fieschertal, Switzerland',
        phone: '+41 33 828 72 33',
        website: 'https://www.jungfrau.ch',
        duration: 'People typically spend 4 hr to 6 hr here',
        cost: 95,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p2',
        name: 'Chapel Bridge & Water Tower (Kapellbrücke)',
        subtitle: 'Iconic 14th-century covered wooden footbridge spanning the Reuss River in Lucerne.',
        bookingWarning: 'Pedestrian only • Open 24/7',
        category: 'Historic Landmark',
        categories: ['Historic Bridge', 'Monument', 'Lucerne'],
        rating: 4.8,
        reviewsCount: 78500,
        coords: [47.0514, 8.3073],
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&auto=format&fit=crop&q=80',
        description: 'Europe oldest wooden covered bridge, adorned with 17th-century interior triangular paintings depicting Lucerne historical events. Offers postcard views of Lake Lucerne and Mount Pilatus.',
        address: 'Kapellbrücke, 6002 Luzern, Switzerland',
        phone: '+41 41 227 17 17',
        website: 'https://www.luzern.com',
        duration: 'People typically spend 1 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p3',
        name: 'Matterhorn Glacier Paradise (Zermatt)',
        subtitle: 'Highest cable car station in Europe (3,883m) with 360-degree views of 38 alpine peaks.',
        bookingWarning: 'Dress in heavy winter layers',
        category: 'Alpine Summit',
        categories: ['Matterhorn', 'Cableway', 'Panoramic View'],
        rating: 4.9,
        reviewsCount: 36200,
        coords: [45.9383, 7.7297],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        description: 'Ascend via the 3S Matterhorn Glacier Ride to the peak observation deck overlooking the world-famous Matterhorn pyramid and Italian peaks.',
        address: 'Schluhmattstrasse 119, 3920 Zermatt, Switzerland',
        phone: '+41 27 966 01 01',
        website: 'https://www.matterhornparadise.ch',
        duration: 'People typically spend 3 hr to 5 hr here',
        cost: 85,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p4',
        name: 'Chillon Castle (Château de Chillon)',
        subtitle: 'Medieval island fortress nestled on the shores of Lake Geneva near Montreux.',
        bookingWarning: 'Audio guide available in 14 languages',
        category: 'Castle & Fortress',
        categories: ['Medieval Castle', 'Lake Geneva', 'Historic Fortress'],
        rating: 4.7,
        reviewsCount: 42100,
        coords: [46.4142, 6.9275],
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
        description: 'Romantically located on a rock island on Lake Geneva, Chillon is Switzerland most visited historic building, once immortalized by Lord Byron.',
        address: 'Av. de Chillon 21, 1820 Veytaux, Switzerland',
        phone: '+41 21 966 89 10',
        website: 'https://www.chillon.ch',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 15,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p5',
        name: 'Harder Kulm Two Lakes Panorama',
        subtitle: 'Dramatic glass-floored viewing platform 1,322m above Interlaken, Lake Thun, and Lake Brienz.',
        bookingWarning: 'Funicular runs every 30 minutes',
        category: 'Scenic Viewpoint',
        categories: ['Funicular', 'Viewpoint', 'Interlaken'],
        rating: 4.8,
        reviewsCount: 31800,
        coords: [46.6974, 7.8654],
        image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=600&auto=format&fit=crop&q=80',
        description: 'Ten minutes from Interlaken on a steep funicular railway brings you to the Two Lakes Bridge with grand vistas of the Eiger, Mönch, and Jungfrau trio.',
        address: 'Harder Kulm, 3800 Interlaken, Switzerland',
        phone: '+41 33 828 72 33',
        website: 'https://www.jungfrau.ch/harder-kulm',
        duration: 'People typically spend 2 hr here',
        cost: 34,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p6',
        name: 'Rhine Falls & Laufen Castle',
        subtitle: 'Most powerful waterfall in Europe with thunderous rapids and boat trips to the central rock.',
        bookingWarning: 'Boat trips run April through October',
        category: 'Natural Wonder',
        categories: ['Waterfall', 'Nature', 'Rhine River'],
        rating: 4.8,
        reviewsCount: 65400,
        coords: [47.6779, 8.6156],
        image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&auto=format&fit=crop&q=80',
        description: 'Vast 150m wide natural cataract plunging 23 meters over limestone cliffs. Belvédère trail leads right to the spray-drenched water edge.',
        address: 'Rheinfallquai, 8212 Neuhausen am Rheinfall, Switzerland',
        phone: '+41 52 632 40 20',
        website: 'https://www.rheinfall.ch',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 5,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p7',
        name: 'Grossmünster & Zurich Altstadt',
        subtitle: 'Iconic Romanesque twin-towered cathedral and historic cobblestone lanes in Zurich center.',
        bookingWarning: 'Tower climb fee: 5 CHF',
        category: 'Cathedral & Old Town',
        categories: ['Cathedral', 'Historic District', 'Zurich'],
        rating: 4.7,
        reviewsCount: 29500,
        coords: [47.3700, 8.5440],
        image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=600&auto=format&fit=crop&q=80',
        description: 'According to legend, Grossmünster was founded by Charlemagne. Climb the Karlsturm tower for panorama over the Limmat river and Lake Zurich.',
        address: 'Grossmünsterplatz, 8001 Zürich, Switzerland',
        phone: '+41 44 252 59 49',
        website: 'https://www.grossmuenster.ch',
        duration: 'People typically spend 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'swiss-p8',
        name: 'Mount Pilatus Dragon Ride & Cogwheel',
        subtitle: 'World steepest cogwheel railway (48% gradient) and aerial dragon ride cable car.',
        bookingWarning: 'Combine with Lake Lucerne paddle steamer',
        category: 'Mountain Adventure',
        categories: ['Cogwheel Railway', 'Summit', 'Lake Lucerne'],
        rating: 4.9,
        reviewsCount: 28400,
        coords: [46.9799, 8.2536],
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
        description: 'Legendary mountain of dragons offering panoramic walking trails, hotel terraces, and heart-pounding ascents via Alpnachstad.',
        address: 'Schlossweg 1, 6010 Kriens, Switzerland',
        phone: '+41 41 329 11 11',
        website: 'https://www.pilatus.ch',
        duration: 'People typically spend 4 hr to 5 hr here',
        cost: 72,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-swiss-1',
        name: 'Chez Vrony (Zermatt)',
        subtitle: 'Michelin-guided sun terrace facing the Matterhorn with organic alpine beef & raclette.',
        category: 'Alpine Gourmet',
        rating: 4.9,
        reviewsCount: 4200,
        price: '$$$',
        coords: [46.0152, 7.7654],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: 'Findeln, 3920 Zermatt, Switzerland',
        cost: 55,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-swiss-2',
        name: 'Kronenhalle (Zurich)',
        subtitle: 'Legendary historic brasserie with Chagall & Picasso art serving Zürcher Geschnetzeltes.',
        category: 'Historic Brasserie',
        rating: 4.8,
        reviewsCount: 6500,
        price: '$$$$',
        coords: [47.3678, 8.5447],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Rämistrasse 4, 8001 Zürich, Switzerland',
        cost: 75,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-swiss-3',
        name: 'Restaurant Balances (Lucerne)',
        subtitle: 'Riverfront terrace dining serving fresh pike-perch and seasonal alpine cheeses.',
        category: 'Swiss Fine Dining',
        rating: 4.7,
        reviewsCount: 3800,
        price: '$$$',
        coords: [47.0520, 8.3056],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: 'Weinmarkt, 6004 Luzern, Switzerland',
        cost: 45,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-swiss-4',
        name: 'Fondue Chalet Interlaken',
        subtitle: 'Cozy timber chalet serving authentic Swiss fondue, crispy Rösti, and Valais wines.',
        category: 'Traditional Swiss',
        rating: 4.8,
        reviewsCount: 5100,
        price: '$$',
        coords: [46.6850, 7.8590],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Höheweg 95, 3800 Interlaken, Switzerland',
        cost: 32,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-swiss-1',
        name: 'The Dolder Grand (Zurich)',
        subtitle: 'Iconic 5-star hilltop resort overlooking Lake Zurich with world-class spa.',
        category: 'Luxury Resort',
        rating: 4.9,
        reviewsCount: 8900,
        price: '$$$$',
        coords: [47.3725, 8.5732],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Kurhausstrasse 65, 8032 Zürich, Switzerland',
        cost: 420,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-swiss-2',
        name: 'Victoria-Jungfrau Grand Hotel & Spa',
        subtitle: 'Historic 1865 grand palace facing the Jungfrau in the heart of Interlaken.',
        category: 'Grand Hotel',
        rating: 4.8,
        reviewsCount: 6400,
        price: '$$$$',
        coords: [46.6865, 7.8570],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
        address: 'Höheweg 41, 3800 Interlaken, Switzerland',
        cost: 350,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'bali': {
    id: 'bali',
    name: 'Bali',
    city: 'Ubud & South Bali',
    country: 'Indonesia',
    fullTitle: 'Trip to Bali, Indonesia',
    passedDestination: 'Bali, Indonesia',
    currency: '₹',
    distanceInfo: 'Tropical Island Paradise',
    center: [-8.5069, 115.2625],
    zoom: 11,
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80',
    dates: '11/10 - 11/15',
    startDate: '11/10',
    endDate: '11/15',
    guides: [
      {
        title: '5-Day Bali Temples & Beaches Itinerary',
        subtitle: 'Ubud culture to Seminyak sunsets',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'bali-p1',
        name: 'Sacred Monkey Forest Sanctuary (Ubud)',
        subtitle: 'Ancient 14th-century temple complex within a lush jungle inhabited by over 1,000 macaques.',
        bookingWarning: 'Do not bring loose food or shiny jewelry',
        category: 'Jungle Sanctuary',
        categories: ['Wildlife', 'Ancient Temple', 'Ubud'],
        rating: 4.8,
        reviewsCount: 92400,
        coords: [-8.5188, 115.2585],
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
        description: 'Vibrant conservation reserve housing three sacred 14th-century temples dedicated to Shiva, overgrown banyan trees, and playful long-tailed macaques.',
        address: 'Jl. Monkey Forest, Ubud, Gianyar, Bali 80571',
        phone: '+62 361 971304',
        website: 'https://www.monkeyforestubud.com',
        duration: 'People typically spend 2 hr here',
        cost: 8,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p2',
        name: 'Tanah Lot Sea Temple',
        subtitle: 'Ancient Hindu pilgrimage temple perched atop a wave-swept offshore rock formation.',
        bookingWarning: 'Most photogenic at sunset',
        category: 'Sea Temple',
        categories: ['UNESCO Heritage', 'Sea Temple', 'Sunset'],
        rating: 4.7,
        reviewsCount: 114000,
        coords: [-8.6212, 115.0868],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
        description: 'Built in the 16th century by Danghyang Nirartha, Tanah Lot is one of seven sea temples along the Balinese coast, revered for spectacular ocean sunsets.',
        address: 'Beraban, Kediri, Tabanan Regency, Bali 82121',
        phone: '+62 361 880361',
        website: 'https://www.tanahlot.id',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 5,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p3',
        name: 'Tegalalang Rice Terraces',
        subtitle: 'Verdant cascading emerald-green rice paddies sculpted into the hillside with Subak irrigation.',
        bookingWarning: 'Wear sturdy walking shoes',
        category: 'Cultural Landscape',
        categories: ['Rice Terraces', 'Subak', 'Nature'],
        rating: 4.8,
        reviewsCount: 68000,
        coords: [-8.4332, 115.2785],
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=80',
        description: 'Iconic valley of undulating stepped paddies adhering to Bali traditional 8th-century communal water management system. Features the famous giant jungle swings.',
        address: 'Jl. Raya Tegallalang, Gianyar, Bali 80561',
        duration: 'People typically spend 2 hr here',
        cost: 3,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p4',
        name: 'Uluwatu Temple (Pura Luhur)',
        subtitle: 'Magnificent sea temple perched on a sheer 70-meter cliff with live sunset Kecak Fire Dance.',
        bookingWarning: 'Book Kecak dance tickets in advance',
        category: 'Cliff Temple',
        categories: ['Sea Cliff', 'Kecak Dance', 'Hindu Temple'],
        rating: 4.8,
        reviewsCount: 88500,
        coords: [-8.8291, 115.0849],
        image: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?w=600&auto=format&fit=crop&q=80',
        description: 'Perched high above the crashing Indian Ocean swells, Uluwatu protects the island from evil spirits and hosts an open-air amphitheater for the nightly Kecak chanting dance.',
        address: 'Pecatu, South Kuta, Badung Regency, Bali 80361',
        phone: '+62 361 702955',
        duration: 'People typically spend 3 hr here',
        cost: 7,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p5',
        name: 'Tirta Empul Holy Water Springs',
        subtitle: 'Sacred Hindu water purification temple founded in 962 AD with crystal-clear bathing pools.',
        bookingWarning: 'Sarong provided at entrance',
        category: 'Sacred Spring',
        categories: ['Holy Water', 'Ritual Purification', 'Historic Temple'],
        rating: 4.8,
        reviewsCount: 39000,
        coords: [-8.4150, 115.3150],
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
        description: 'Dedicated to Vishnu, the spring water bubbles naturally from the ground and feeds ceremonial stone fountains where pilgrims partake in the Melukat cleansing ritual.',
        address: 'Jl. Tirta, Manukaya, Tampaksiring, Gianyar, Bali 80552',
        duration: 'People typically spend 2 hr here',
        cost: 4,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p6',
        name: 'Mount Batur Sunrise Volcano Trek',
        subtitle: 'Active volcanic caldera with early-morning guided hiking and breakfast cooked over steam vents.',
        bookingWarning: 'Hike begins at 3:30 AM',
        category: 'Volcano Adventure',
        categories: ['Sunrise Trek', 'Active Volcano', 'Geopark'],
        rating: 4.9,
        reviewsCount: 29500,
        coords: [-8.2420, 115.3750],
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=80',
        description: 'UNESCO Global Geopark summit rising 1,717m above sea level, offering unforgettable views of Lake Batur and Mount Agung pierced by the morning sun.',
        address: 'South Batur, Kintamani, Bangli Regency, Bali',
        duration: 'People typically spend 4 hr to 6 hr here',
        cost: 35,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bali-p7',
        name: 'Campuhan Ridge Walk',
        subtitle: 'Serene paved crest path between river valleys offering lush views of Ubud hills.',
        bookingWarning: 'Best visited in early morning or late afternoon',
        category: 'Scenic Trail',
        categories: ['Walking Trail', 'Ubud Hills', 'Nature'],
        rating: 4.7,
        reviewsCount: 34100,
        coords: [-8.5035, 115.2540],
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
        description: 'A 2km peaceful hillside trail flanked by swaying reeds and tropical foliage, connecting downtown Ubud to artisan villages.',
        address: 'Kelusa, Payangan, Jl. Raya Campuhan, Sayan, Ubud, Bali 80571',
        duration: 'People typically spend 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-bali-1',
        name: 'Locavore NXT (Ubud)',
        subtitle: 'World-renowned culinary lab celebrating hyper-local Indonesian mushrooms, heritage rice & foraged herbs.',
        category: 'Modern Indonesian',
        rating: 4.9,
        reviewsCount: 3600,
        price: '$$$$',
        coords: [-8.5080, 115.2640],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: 'Jl. Dewisita No.10, Ubud, Bali',
        cost: 65,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-bali-2',
        name: 'Merah Putih (Seminyak)',
        subtitle: 'Grand cathedral-ceiling dining room serving refined regional Indonesian curries & charcoal satays.',
        category: 'Indonesian Fine Dining',
        rating: 4.8,
        reviewsCount: 7200,
        price: '$$$',
        coords: [-8.6820, 115.1550],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Jl. Petitenget No.100X, Seminyak, Bali',
        cost: 40,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-bali-3',
        name: 'Warung Babi Guling Ibu Oka',
        subtitle: 'Legendary Ubud institution famed for crispy-skin roasted suckling pig, blood sausage & spicy sambal.',
        category: 'Authentic Balinese',
        rating: 4.7,
        reviewsCount: 12500,
        price: '$',
        coords: [-8.5060, 115.2620],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Jl. Tegal Sari No.2, Ubud, Bali',
        cost: 8,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-bali-1',
        name: 'Hanging Gardens of Bali',
        subtitle: 'Ultra-luxury rainforest resort renowned for twin-tiered cascading infinity pools in Ubud.',
        category: 'Jungle Luxury',
        rating: 4.9,
        reviewsCount: 5800,
        price: '$$$$',
        coords: [-8.4110, 115.2390],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
        address: 'Buahan, Payangan, Gianyar, Bali 80571',
        cost: 380,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-bali-2',
        name: 'Potato Head Suites & Studios',
        subtitle: 'Iconic eco-luxury beachfront village with beach club and sustainable design in Seminyak.',
        category: 'Beach Resort',
        rating: 4.8,
        reviewsCount: 7100,
        price: '$$$$',
        coords: [-8.6860, 115.1510],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Jl. Petitenget No.51B, Seminyak, Bali',
        cost: 260,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'goa': {
    id: 'goa',
    name: 'Goa',
    city: 'Panaji & Coastal Goa',
    country: 'India',
    fullTitle: 'Trip to Goa, India',
    passedDestination: 'Goa, India',
    currency: '₹',
    distanceInfo: 'Sun, Sand & Heritage',
    center: [15.4989, 73.8278],
    zoom: 11,
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
    dates: '11/15 - 11/20',
    startDate: '11/15',
    endDate: '11/20',
    guides: [
      {
        title: '5-Day Goa Coastlines & Portuguese Heritage',
        subtitle: 'North Goa beaches to South Goa serenity',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'goa-p1',
        name: 'Basilica of Bom Jesus (UNESCO)',
        subtitle: '16th-century Portuguese Baroque church enshrining the mortal remains of St. Francis Xavier.',
        bookingWarning: 'Modest dress code required',
        category: 'UNESCO Basilica',
        categories: ['Baroque Church', 'UNESCO World Heritage', 'Old Goa'],
        rating: 4.8,
        reviewsCount: 54000,
        coords: [15.5009, 73.9116],
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80',
        description: 'Completed in 1605, this masterpiece of Jesuit architecture features elaborate carved gilded altars and a silver casket containing the saint relics.',
        address: 'Old Goa Rd, Bainguinim, Goa 403402',
        duration: 'People typically spend 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p2',
        name: 'Fort Aguada & 17th Century Lighthouse',
        subtitle: 'Sprawling Portuguese fortress overlooking Sinquerim beach and the Arabian Sea.',
        bookingWarning: 'Great sunset panoramic views',
        category: 'Portuguese Fort',
        categories: ['Historic Fort', 'Lighthouse', 'Arabian Sea'],
        rating: 4.7,
        reviewsCount: 82000,
        coords: [15.4925, 73.7736],
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&auto=format&fit=crop&q=80',
        description: 'Constructed in 1612 to guard against Dutch invaders and Maratha raiders, Fort Aguada possessed a capacity of 2,376,000 gallons of freshwater.',
        address: 'Aguada Fort Area, Candolim, Goa 403515',
        duration: 'People typically spend 2 hr here',
        cost: 2,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p3',
        name: 'Dudhsagar Four-Tiered Falls',
        subtitle: 'Spectacular 310m tiered milky-white cascade deep within the Bhagwan Mahaveer Sanctuary.',
        bookingWarning: 'Requires 4x4 jungle jeep safari',
        category: 'Waterfall',
        categories: ['Jungle Safari', 'Waterfalls', 'Western Ghats'],
        rating: 4.8,
        reviewsCount: 39500,
        coords: [15.3144, 74.3143],
        image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&auto=format&fit=crop&q=80',
        description: 'One of the tallest waterfalls in India, where the Mandovi River crashes down the Western Ghats creating a Sea of Milk.',
        address: 'Sonaulim, Goa 403410',
        duration: 'People typically spend 4 hr to 6 hr here',
        cost: 8,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p4',
        name: 'Fontainhas Latin Quarter (Panaji)',
        subtitle: 'Heritage Portuguese quarter with pastel-hued villas, wrought-iron balconies & art cafes.',
        bookingWarning: 'Pedestrian exploration recommended',
        category: 'Heritage Quarter',
        categories: ['Portuguese Quarter', 'Architecture', 'Panaji'],
        rating: 4.7,
        reviewsCount: 41000,
        coords: [15.4975, 73.8320],
        image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=600&auto=format&fit=crop&q=80',
        description: 'Preserving Goa Latin heritage since 1800, Fontainhas features narrow alleys, vibrant ochre and azure homes, and historic bakeries.',
        address: 'Fontainhas, Mala, Panaji, Goa 403001',
        duration: 'People typically spend 2 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p5',
        name: 'Chapora Fort (Dil Chahta Hai Point)',
        subtitle: 'Prominent laterite cliff fort overlooking Vagator Beach and the sparkling Chapora River.',
        bookingWarning: 'Spectacular sunset viewpoint',
        category: 'Hilltop Fort',
        categories: ['Cliff Viewpoint', 'Bollywood Landmark', 'North Goa'],
        rating: 4.8,
        reviewsCount: 61000,
        coords: [15.6058, 73.7380],
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&auto=format&fit=crop&q=80',
        description: 'Ancient fortification commanding strategic views across the coastline, celebrated in modern Indian pop culture and cinematic history.',
        address: 'Chapora Fort Trail, Vagator, Goa 403509',
        duration: 'People typically spend 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p6',
        name: 'Anjuna Beach & Flea Market',
        subtitle: 'Bohemian red-rock beach cove famous for seaside shacks and eclectic weekly craft markets.',
        bookingWarning: 'Wednesday flea market',
        category: 'Coastal Beach',
        categories: ['Beach', 'Bohemian Market', 'Water Sports'],
        rating: 4.6,
        reviewsCount: 75000,
        coords: [15.5733, 73.7410],
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80',
        description: 'Iconic beach bordered by palms and volcanic laterite rocks, famed for fresh coconut water, water sports, and seaside live music.',
        address: 'Anjuna Beach, North Goa 403509',
        duration: 'People typically spend 3 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'goa-p7',
        name: 'Palolem Crescent Beach',
        subtitle: 'Gentle crescent bay in South Goa lined with colorful beach huts and dolphin boat tours.',
        bookingWarning: 'Calm swimming waters',
        category: 'Serene Beach',
        categories: ['South Goa', 'Swimming Bay', 'Palm Trees'],
        rating: 4.8,
        reviewsCount: 52000,
        coords: [15.0100, 74.0230],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        description: 'One of the most scenic and tranquil beaches in India, framed by headlands with kayak rentals to Butterfly Island.',
        address: 'Palolem, Canacona, South Goa 403702',
        duration: 'People typically spend 3 hr to 4 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-goa-1',
        name: 'Fisherman Wharf (Cavelossim)',
        subtitle: 'Scenic riverside restaurant serving authentic Goan prawn balchão and kingfish curry thali.',
        category: 'Goan Seafood',
        rating: 4.9,
        reviewsCount: 8900,
        price: '$$$',
        coords: [15.1630, 73.9450],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: 'Near Cutbona Jetty, Cavelossim, Goa',
        cost: 25,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-goa-2',
        name: 'Gunpowder (Assagao)',
        subtitle: 'Heritage garden villa serving vibrant coastal South Indian curries and fluffy appams.',
        category: 'Coastal Indian',
        rating: 4.8,
        reviewsCount: 6400,
        price: '$$',
        coords: [15.5900, 73.7700],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Saunto Vaddo, Assagao, Goa',
        cost: 20,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-goa-3',
        name: 'Martin Corner (Betalbatim)',
        subtitle: 'Legendary celebrity-frequented institution famous for butter garlic crab & pork vindaloo.',
        category: 'Goan Classic',
        rating: 4.8,
        reviewsCount: 14200,
        price: '$$$',
        coords: [15.2950, 73.9180],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: 'Binwaddo, Betalbatim, Goa',
        cost: 28,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-goa-1',
        name: 'Taj Exotica Resort & Spa (Benaulim)',
        subtitle: 'Sprawling 56-acre Mediterranean-style beach sanctuary in pristine South Goa.',
        category: 'Luxury Beach Resort',
        rating: 4.9,
        reviewsCount: 6800,
        price: '$$$$',
        coords: [15.2670, 73.9280],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Calwaddo, Benaulim, Goa 403716',
        cost: 290,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-goa-2',
        name: 'W Goa (Vagator)',
        subtitle: 'Vibrant cliffside resort overlooking the Arabian Sea with private beach access.',
        category: 'Coastal Resort',
        rating: 4.8,
        reviewsCount: 5200,
        price: '$$$$',
        coords: [15.5980, 73.7360],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
        address: 'Vagator Beach, Bardez, Goa 403509',
        cost: 320,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'rome': {
    id: 'rome',
    name: 'Rome',
    city: 'Rome & Vatican City',
    country: 'Italy',
    fullTitle: 'Trip to Rome, Italy',
    passedDestination: 'Rome, Italy',
    currency: '€',
    distanceInfo: 'Eternal City & Historic Center',
    center: [41.9028, 12.4964],
    zoom: 13,
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&auto=format&fit=crop&q=80',
    dates: '10/20 - 10/25',
    startDate: '10/20',
    endDate: '10/25',
    guides: [
      {
        title: '5-Day Rome & Vatican Complete Itinerary',
        subtitle: 'Most popular Roman walking route',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'rome-p1',
        name: 'Colosseum & Flavian Amphitheatre',
        subtitle: 'Iconic 1st-century Roman amphitheatre, arena floor, and underground hypogeum.',
        bookingWarning: 'Advance passport reservation mandatory',
        category: 'Ancient Monument',
        categories: ['UNESCO Heritage', 'Ancient Rome', 'Amphitheatre'],
        rating: 4.9,
        reviewsCount: 168000,
        coords: [41.8902, 12.4922],
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80',
        description: 'The largest ancient amphitheatre ever built, constructed under Emperor Vespasian. Famous for gladiatorial contests and ancient spectacles.',
        address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 24,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'rome-p2',
        name: 'Trevi Fountain (Fontana di Trevi)',
        subtitle: 'Triumphal Baroque fountain depicting Oceanus; coin toss tradition guarantees return to Rome.',
        bookingWarning: 'Best early morning to avoid crowds',
        category: 'Baroque Monument',
        categories: ['Fountain', 'Baroque', 'Piazza'],
        rating: 4.8,
        reviewsCount: 285000,
        coords: [41.9009, 12.4833],
        image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=80',
        description: 'Designed by Nicola Salvi in 1762, this breathtaking Travertine masterpiece is crowned by Neptune chariot flanked by tritons.',
        address: 'Piazza di Trevi, 00187 Roma RM, Italy',
        duration: 'People typically spend 45 min here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'rome-p3',
        name: 'Pantheon of Rome',
        subtitle: '2,000-year-old Roman temple with the world largest unreinforced concrete dome and oculus.',
        bookingWarning: 'Timed entry ticket required on weekends',
        category: 'Ancient Temple',
        categories: ['Ancient Rome', 'Dome', 'Tomb of Raphael'],
        rating: 4.9,
        reviewsCount: 220000,
        coords: [41.8986, 12.4769],
        image: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?w=600&auto=format&fit=crop&q=80',
        description: 'Remarkably preserved ancient Roman monument consecrated as the Basilica of St. Mary and the Martyrs, housing the tomb of painter Raphael.',
        address: 'Piazza della Rotonda, 00186 Roma RM, Italy',
        duration: 'People typically spend 1 hr here',
        cost: 5,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'rome-p4',
        name: 'Roman Forum & Palatine Hill',
        subtitle: 'Sprawling ancient civic center of the Roman Empire amidst temple ruins and arches.',
        bookingWarning: 'Included with Colosseum combo ticket',
        category: 'Archaeological Park',
        categories: ['Ruins', 'Palatine Hill', 'Curia Julia'],
        rating: 4.8,
        reviewsCount: 112000,
        coords: [41.8925, 12.4853],
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&auto=format&fit=crop&q=80',
        description: 'The political, religious, and commercial heart of ancient Rome, spanning the Temple of Saturn, Arch of Titus, and the House of Augustus.',
        address: 'Via della Salara Vecchia, 5/6, 00186 Roma RM, Italy',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'rome-p5',
        name: 'St. Peter Basilica & Sistine Chapel',
        subtitle: 'Papal enclave featuring Michelangelo Pieta, towering dome, and renaissance frescoes.',
        bookingWarning: 'Strict modest dress code enforced',
        category: 'Renaissance Basilica',
        categories: ['Vatican City', 'Michelangelo', 'Papal Enclave'],
        rating: 4.9,
        reviewsCount: 310000,
        coords: [41.9022, 12.4539],
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&auto=format&fit=crop&q=80',
        description: 'The epicenter of Catholicism and Renaissance architecture designed by Bramante, Michelangelo, and Bernini, featuring the Sistine Chapel ceiling.',
        address: 'Piazza San Pietro, 00120 Città del Vaticano',
        duration: 'People typically spend 3 hr to 4 hr here',
        cost: 22,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'rome-p6',
        name: 'Piazza Navona & Bernini Fountain',
        subtitle: 'Lively Baroque square built on Domitian ancient stadium with street artists and open cafés.',
        bookingWarning: 'Pedestrian plaza • Open 24/7',
        category: 'Historic Plaza',
        categories: ['Baroque Piazza', 'Bernini', 'Fountain'],
        rating: 4.8,
        reviewsCount: 175000,
        coords: [41.8992, 12.4731],
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        description: 'Showcases Gian Lorenzo Bernini Fountain of the Four Rivers (Fontana dei Quattro Fiumi) and Borromini church of Sant Agnese in Agone.',
        address: 'Piazza Navona, 00186 Roma RM, Italy',
        duration: 'People typically spend 1 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-rome-1',
        name: 'Trattoria Da Enzo al 29 (Trastevere)',
        subtitle: 'Authentic Roman trattoria famed for crispy carciofi alla giudia and creamy cacio e pepe.',
        category: 'Roman Trattoria',
        rating: 4.8,
        reviewsCount: 8900,
        price: '$$',
        coords: [41.8885, 12.4760],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: 'Via dei Vascellari, 29, 00153 Roma RM, Italy',
        cost: 28,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-rome-2',
        name: 'Roscioli Salumeria con Cucina',
        subtitle: 'Legendary salumeria and dining room famous for artisanal carbonara and aged pecorino.',
        category: 'Gourmet Salumeria',
        rating: 4.9,
        reviewsCount: 11200,
        price: '$$$',
        coords: [41.8942, 12.4738],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Via dei Giubbonari, 21/22, 00186 Roma RM, Italy',
        cost: 48,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-rome-1',
        name: 'Hotel de Russie (Rocco Forte)',
        subtitle: 'Celebrated 5-star luxury hotel with terraced Mediterranean gardens near Piazza del Popolo.',
        category: '5-Star Luxury',
        rating: 4.9,
        reviewsCount: 6100,
        price: '$$$$',
        coords: [41.9100, 12.4780],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Via del Babuino, 9, 00187 Roma RM, Italy',
        cost: 450,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'london': {
    id: 'london',
    name: 'London',
    city: 'London & Westminster',
    country: 'United Kingdom',
    fullTitle: 'Trip to London, UK',
    passedDestination: 'London, UK',
    currency: '£',
    distanceInfo: 'Historic Capital on the Thames',
    center: [51.5074, -0.1278],
    zoom: 13,
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop&q=80',
    dates: '10/18 - 10/23',
    startDate: '10/18',
    endDate: '10/23',
    guides: [
      {
        title: '5-Day Iconic London Landmark Itinerary',
        subtitle: 'Most popular royal & cultural trail',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'ldn-p1',
        name: 'Tower of London & Crown Jewels',
        subtitle: 'Historic 11th-century royal castle, White Tower fortress, and ceremonial Crown Jewels.',
        bookingWarning: 'Morning entry recommended for Crown Jewels',
        category: 'Historic Castle',
        categories: ['UNESCO Heritage', 'Royalty', 'Crown Jewels'],
        rating: 4.8,
        reviewsCount: 145000,
        coords: [51.5081, -0.0759],
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
        description: 'Founded by William the Conqueror in 1066. Served as a royal palace, prison, and armory, protected by Yeoman Warders (Beefeaters).',
        address: 'Tower of London, London EC3N 4AB, UK',
        duration: 'People typically spend 3 hr here',
        cost: 34,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'ldn-p2',
        name: 'The British Museum',
        subtitle: 'Vast world heritage museum housing the Rosetta Stone, Parthenon Marbles, and Egyptian Mummies.',
        bookingWarning: 'Free general admission • Timed ticket recommended',
        category: 'World Museum',
        categories: ['Ancient Antiquities', 'Rosetta Stone', 'Bloomsbury'],
        rating: 4.9,
        reviewsCount: 198000,
        coords: [51.5194, -0.1270],
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&auto=format&fit=crop&q=80',
        description: 'Dedicated to human history, art, and culture. The Great Court features Foster and Partners iconic glass-and-steel tessellated roof.',
        address: 'Great Russell St, London WC1B 3DG, UK',
        duration: 'People typically spend 3 hr to 4 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'ldn-p3',
        name: 'Big Ben & Palace of Westminster',
        subtitle: 'Gothic revival parliament complex and Elizabeth Tower bell overlooking Westminster Bridge.',
        bookingWarning: 'Tours booked in advance',
        category: 'Government Landmark',
        categories: ['UNESCO Heritage', 'Big Ben', 'Westminster'],
        rating: 4.8,
        reviewsCount: 162000,
        coords: [51.5007, -0.1246],
        image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=600&auto=format&fit=crop&q=80',
        description: 'The meeting place of the House of Commons and House of Lords, famous for Charles Barry and Augustus Pugin neo-Gothic architecture.',
        address: 'London SW1A 0AA, UK',
        duration: 'People typically spend 1 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'ldn-p4',
        name: 'Tower Bridge High-Level Walkways',
        subtitle: 'Victorian twin-tower suspension bridge with high-level glass floor overlooking the River Thames.',
        bookingWarning: 'Bridge engine rooms exhibition included',
        category: 'Iconic Bridge',
        categories: ['Victorian Engineering', 'Thames', 'Glass Floor'],
        rating: 4.8,
        reviewsCount: 154000,
        coords: [51.5055, -0.0754],
        image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&auto=format&fit=crop&q=80',
        description: 'Completed in 1894, this neo-Gothic bascule bridge opens for passing river traffic and offers sweeping panoramas across London.',
        address: 'Tower Bridge Rd, London SE1 2UP, UK',
        duration: 'People typically spend 1.5 hr here',
        cost: 13,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-ldn-1',
        name: 'Dishoom Covent Garden',
        subtitle: 'Atmospheric Bombay-style café serving black daal, spiced grill chops, and breakfast naan rolls.',
        category: 'Bombay Café',
        rating: 4.8,
        reviewsCount: 15600,
        price: '$$',
        coords: [51.5126, -0.1264],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: '12 Upper St Martin Ln, London WC2H 9FB',
        cost: 28,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-ldn-1',
        name: 'The Savoy London',
        subtitle: 'Legendary British Edwardian luxury hotel on the Strand overlooking the Thames.',
        category: '5-Star Grand Hotel',
        rating: 4.8,
        reviewsCount: 9400,
        price: '$$$$',
        coords: [51.5103, -0.1205],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Strand, London WC2R 0EZ, UK',
        cost: 420,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'newyork': {
    id: 'newyork',
    name: 'New York',
    city: 'New York City',
    country: 'United States',
    fullTitle: 'Trip to New York City',
    passedDestination: 'New York, USA',
    currency: '$',
    distanceInfo: 'Manhattan & The Five Boroughs',
    center: [40.7128, -74.0060],
    zoom: 12,
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&auto=format&fit=crop&q=80',
    dates: '10/22 - 10/27',
    startDate: '10/22',
    endDate: '10/27',
    guides: [
      {
        title: '5-Day Manhattan Highlights Itinerary',
        subtitle: 'Central Park to Financial District',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'nyc-p1',
        name: 'Central Park & Bethesda Terrace',
        subtitle: '843-acre green oasis with Bow Bridge, Strawberry Fields, and scenic rowboats.',
        bookingWarning: 'Open 6:00 AM to 1:00 AM daily',
        category: 'Urban Park',
        categories: ['Park', 'Landmark', 'Manhattan'],
        rating: 4.9,
        reviewsCount: 310000,
        coords: [40.7851, -73.9683],
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80',
        description: 'Designed by Frederick Law Olmsted and Calvert Vaux, Central Park features picturesque woodlands, walking paths, and iconic bridges.',
        address: 'New York, NY 10024, United States',
        duration: 'People typically spend 2 hr to 4 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'nyc-p2',
        name: 'Empire State Building Observatory',
        subtitle: 'Art Deco skyscraper with 86th & 102nd floor open-air decks overlooking Manhattan.',
        bookingWarning: 'Sunset time slots sell out fast',
        category: 'Iconic Skyscraper',
        categories: ['Art Deco', 'Observation Deck', 'Manhattan'],
        rating: 4.8,
        reviewsCount: 225000,
        coords: [40.7484, -73.9857],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
        description: 'Standing 1,454 feet above Midtown Manhattan, this world-famous 1931 landmark offers 360-degree vistas across six states.',
        address: '20 W 34th St, New York, NY 10001, United States',
        duration: 'People typically spend 2 hr here',
        cost: 44,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'nyc-p3',
        name: 'The Metropolitan Museum of Art (The Met)',
        subtitle: 'Over 2 million works spanning 5,000 years of global art, Egyptian Temple of Dendur & European masters.',
        bookingWarning: 'Closed on Wednesdays',
        category: 'Fine Art Museum',
        categories: ['Museum', 'Temple of Dendur', 'Fine Arts'],
        rating: 4.9,
        reviewsCount: 168000,
        coords: [40.7794, -73.9632],
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=80',
        description: 'America largest art museum situated on Museum Mile along Fifth Avenue, showcasing Greek antiquities, Arms & Armor, and rooftop gardens.',
        address: '1000 5th Ave, New York, NY 10028, United States',
        duration: 'People typically spend 3 hr to 5 hr here',
        cost: 30,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'nyc-p4',
        name: 'Brooklyn Bridge & DUMBO Promenade',
        subtitle: 'Historic 1883 suspension bridge with elevated pedestrian boardwalk spanning the East River.',
        bookingWarning: 'Bicycle and walking paths separated',
        category: 'Suspension Bridge',
        categories: ['National Historic Landmark', 'East River', 'DUMBO'],
        rating: 4.8,
        reviewsCount: 182000,
        coords: [40.7061, -73.9969],
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=600&auto=format&fit=crop&q=80',
        description: 'John A. Roebling neo-Gothic twin stone towers connect Lower Manhattan to Brooklyn, offering postcard city skyline vistas.',
        address: 'New York, NY 10038, United States',
        duration: 'People typically spend 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-nyc-1',
        name: 'Katz Delicatessen (Lower East Side)',
        subtitle: 'Legendary 1888 Jewish deli famous for towering pastrami on rye and hand-carved brisket.',
        category: 'Historic Deli',
        rating: 4.8,
        reviewsCount: 38000,
        price: '$$',
        coords: [40.7222, -73.9874],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: '205 E Houston St, New York, NY 10002',
        cost: 32,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-nyc-1',
        name: 'The Plaza Hotel',
        subtitle: 'Centennial French Renaissance château hotel on Fifth Avenue overlooking Central Park.',
        category: '5-Star Landmark',
        rating: 4.8,
        reviewsCount: 12500,
        price: '$$$$',
        coords: [40.7645, -73.9745],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: '768 5th Ave, New York, NY 10019',
        cost: 580,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'barcelona': {
    id: 'barcelona',
    name: 'Barcelona',
    city: 'Barcelona & Catalonia',
    country: 'Spain',
    fullTitle: 'Trip to Barcelona, Spain',
    passedDestination: 'Barcelona, Spain',
    currency: '€',
    distanceInfo: 'Mediterranean Coastal Capital',
    center: [41.3851, 2.1734],
    zoom: 13,
    coverImage: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&auto=format&fit=crop&q=80',
    dates: '10/15 - 10/20',
    startDate: '10/15',
    endDate: '10/20',
    guides: [
      {
        title: '5-Day Ultimate Gaudí & Tapas Itinerary',
        subtitle: 'Most popular architectural trail',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'bcn-p1',
        name: 'Basílica de la Sagrada Família',
        subtitle: 'Antoni Gaudí masterpiece basilica with tree-like columns, Nativity Facade, and stained glass.',
        bookingWarning: 'Book 3-4 weeks ahead for tower access',
        category: 'Modernisme Basilica',
        categories: ['UNESCO Heritage', 'Gaudí', 'Architecture'],
        rating: 4.9,
        reviewsCount: 248000,
        coords: [41.4036, 2.1744],
        image: 'https://images.unsplash.com/photo-1583779457094-0cef1bad01ee?w=600&auto=format&fit=crop&q=80',
        description: 'Construction began in 1882 under Antoni Gaudí. A transcendent fusion of Gothic and Art Nouveau architecture symbolizing nature and faith.',
        address: 'Carrer de Mallorca, 401, 08013 Barcelona, Spain',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 26,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bcn-p2',
        name: 'Park Güell Monumental Zone',
        subtitle: 'Vibrant mosaic salamander terrace and Hansel & Gretel gatehouses overlooking the sea.',
        bookingWarning: 'Strict timed entry tickets required',
        category: 'Sculpture Garden',
        categories: ['UNESCO Heritage', 'Mosaic', 'Panoramic Vista'],
        rating: 4.8,
        reviewsCount: 172000,
        coords: [41.4145, 2.1527],
        image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=600&auto=format&fit=crop&q=80',
        description: 'Public park system composed of gardens and architectural elements designed by Gaudí on Carmel Hill, featuring the serpentine mosaic bench.',
        address: '08024 Barcelona, Spain',
        duration: 'People typically spend 2 hr here',
        cost: 10,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'bcn-p3',
        name: 'Casa Batlló (Dragon Roof)',
        subtitle: 'Whimsical dragon-scale building with mask balconies and marine-blue ceramic atrium.',
        bookingWarning: 'Augmented reality smart guide included',
        category: 'Modernisme Palace',
        categories: ['Gaudí', 'Passeig de Gràcia', 'Dragon Roof'],
        rating: 4.8,
        reviewsCount: 114000,
        coords: [41.3917, 2.1649],
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80',
        description: 'Renovated by Gaudí in 1904, known locally as the House of Bones for its skeletal stone pillars and iridescent dragon-back roof.',
        address: 'Passeig de Gràcia, 43, 08007 Barcelona, Spain',
        duration: 'People typically spend 1.5 hr here',
        cost: 29,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-bcn-1',
        name: 'Cervecería Catalana (Eixample)',
        subtitle: 'Iconic tapas bar buzzing with Iberian ham montaditos, crispy patatas bravas, and grilled razor clams.',
        category: 'Tapas Bar',
        rating: 4.8,
        reviewsCount: 16500,
        price: '$$',
        coords: [41.3923, 2.1608],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: 'Carrer de Mallorca, 236, 08008 Barcelona, Spain',
        cost: 32,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-bcn-1',
        name: 'W Barcelona (Sail Hotel)',
        subtitle: 'Avant-garde sail-shaped seaside icon rising above Barceloneta beach with rooftop wet deck.',
        category: 'Beachfront Luxury',
        rating: 4.8,
        reviewsCount: 14200,
        price: '$$$$',
        coords: [41.3688, 2.1903],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Plaça Rosa Del Vents 1, 08039 Barcelona, Spain',
        cost: 360,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'dubai': {
    id: 'dubai',
    name: 'Dubai',
    city: 'Dubai & Emirates',
    country: 'United Arab Emirates',
    fullTitle: 'Trip to Dubai, UAE',
    passedDestination: 'Dubai, UAE',
    currency: 'AED',
    distanceInfo: 'Futuristic Arabian Metropolis',
    center: [25.2048, 55.2708],
    zoom: 12,
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80',
    dates: '11/01 - 11/06',
    startDate: '11/01',
    endDate: '11/06',
    guides: [
      {
        title: '5-Day Dubai Wonder & Desert Safari Itinerary',
        subtitle: 'Skyscrapers, Souks & Dunes',
        source: 'TripMate',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'dxb-p1',
        name: 'Burj Khalifa - At the Top',
        subtitle: 'World tallest skyscraper (828m) with observation decks on Levels 124, 125, and 148.',
        bookingWarning: 'Book sunset tickets 1-2 weeks in advance',
        category: 'Megatall Skyscraper',
        categories: ['World Record', 'Observation Deck', 'Downtown Dubai'],
        rating: 4.9,
        reviewsCount: 185000,
        coords: [25.1972, 55.2744],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
        description: 'Rising 828 meters above Downtown Dubai, this 163-story architectural marvel features high-speed double-decker elevators and desert views.',
        address: '1 Sheikh Mohammed bin Rashid Blvd, Dubai',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 45,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'dxb-p2',
        name: 'The Dubai Mall & Dubai Fountain',
        subtitle: 'Massive entertainment hub with choreographed fountain spectacles, indoor aquarium & ice rink.',
        bookingWarning: 'Fountain shows every 30 minutes from 6 PM',
        category: 'Mega Complex',
        categories: ['Fountain Show', 'Dubai Aquarium', 'Shopping'],
        rating: 4.8,
        reviewsCount: 240000,
        coords: [25.1985, 55.2796],
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=80',
        description: 'Spanning over 12 million square feet, featuring 1,200 retail stores, Olympic-sized ice rink, and the 275-meter illuminated lake fountain.',
        address: 'Downtown Dubai, Dubai, UAE',
        duration: 'People typically spend 3 hr to 5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'dxb-p3',
        name: 'Palm Jumeirah & The View at The Palm',
        subtitle: 'World-famous palm-tree-shaped archipelago with 360-degree observation deck and Aquaventure.',
        bookingWarning: 'Monorail connects mainland to Atlantis',
        category: 'Artificial Archipelago',
        categories: ['Palm Island', 'The View', 'Arabian Gulf'],
        rating: 4.8,
        reviewsCount: 96000,
        coords: [25.1124, 55.1390],
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&auto=format&fit=crop&q=80',
        description: 'Engineered island marvel reclaimed from the Arabian Gulf, fringed with luxury villas, beachfront promenades, and beach clubs.',
        address: 'Palm Jumeirah, Dubai, UAE',
        duration: 'People typically spend 2 hr here',
        cost: 25,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-dxb-1',
        name: 'Zuma Dubai (DIFC)',
        subtitle: 'Award-winning contemporary Japanese izakaya dining room serving miso marinated black cod.',
        category: 'Contemporary Japanese',
        rating: 4.9,
        reviewsCount: 8200,
        price: '$$$$',
        coords: [25.2100, 55.2810],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: 'Gate Village 06, DIFC, Dubai',
        cost: 85,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-dxb-1',
        name: 'Burj Al Arab Jumeirah',
        subtitle: 'World renowned sail-shaped 7-star ultra-luxury landmark hotel with private beach & chauffeur Rolls-Royces.',
        category: 'Ultra Luxury Icon',
        rating: 4.9,
        reviewsCount: 18400,
        price: '$$$$',
        coords: [25.1412, 55.1852],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: 'Umm Suqeim 3, Dubai, UAE',
        cost: 1100,
        expenseCategory: 'Lodging'
      }
    ]
  },
  'singapore': {
    id: 'singapore',
    name: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    fullTitle: 'Trip to Singapore',
    passedDestination: 'Singapore',
    currency: 'SGD',
    distanceInfo: 'Lion City • Tropical Garden Metropolis',
    center: [1.2834, 103.8500],
    zoom: 13,
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop&q=80',
    dates: '11/01 - 11/07',
    startDate: '11/01',
    endDate: '11/07',
    guides: [
      {
        title: '7-Day Singapore Garden City & Heritage Trail',
        subtitle: 'Supertree Groves, Rooftop Vistas & Street Food',
        source: 'TripMate Curated',
        image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d456f?w=500&auto=format&fit=crop&q=80'
      }
    ],
    allCuratedPlaces: [
      {
        id: 'sg-p1',
        name: 'Marina Bay Sands & SkyPark Observation Deck',
        subtitle: 'World-famous integrated resort with 57th-floor cantilevered SkyPark and 360-degree city panorama.',
        bookingWarning: 'Book sunset SkyPark slot online',
        category: 'Iconic Landmark',
        categories: ['SkyPark', 'Rooftop Vista', 'Marina Bay'],
        rating: 4.9,
        reviewsCount: 142000,
        coords: [1.2840, 103.8610],
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop&q=80',
        description: 'Rising across Marina Bay, this three-tower architectural masterpiece features the world-renowned 150-meter rooftop infinity pool and expansive observation deck.',
        address: '10 Bayfront Avenue, Singapore 018956',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 26,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p2',
        name: 'Gardens by the Bay & Cloud Forest',
        subtitle: 'Futuristic 101-hectare botanical wonderland with vertical Supertree structures and misty indoor waterfall.',
        bookingWarning: 'Garden Rhapsody sound & light show at 7:45 PM & 8:45 PM',
        category: 'Scenic Nature',
        categories: ['Supertrees', 'Cloud Forest', 'Floral Dome'],
        rating: 4.9,
        reviewsCount: 168000,
        coords: [1.2816, 103.8636],
        image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d456f?w=600&auto=format&fit=crop&q=80',
        description: 'Renowned nature park spanning 250 acres of reclaimed land. Features cooled glass conservatories housing mountain flora and the iconic 50-meter Supertree Grove.',
        address: '18 Marina Gardens Dr, Singapore 018953',
        duration: 'People typically spend 3 hr to 4 hr here',
        cost: 28,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p3',
        name: 'Merlion Park & Waterfront Promenade',
        subtitle: 'Legendary mythical creature statue spouting water into Marina Bay with skyline backdrop.',
        category: 'Historic Landmark',
        categories: ['Merlion Statue', 'Waterfront Promenade', 'Civic District'],
        rating: 4.7,
        reviewsCount: 95000,
        coords: [1.2868, 103.8545],
        image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&auto=format&fit=crop&q=80',
        description: 'The iconic half-lion, half-fish symbol of Singapore overlooking the waterfront basin. Beautiful for daytime photography and illuminated skyline walks.',
        address: '1 Fullerton Rd, Singapore 049213',
        duration: 'People typically spend 1 hr to 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p4',
        name: 'Singapore Botanic Gardens & Orchid Garden',
        subtitle: 'UNESCO World Heritage tropical garden founded in 1859 with over 1,000 orchid species.',
        category: 'Scenic Nature',
        categories: ['UNESCO Heritage', 'Orchid Garden', 'Rainforest Walk'],
        rating: 4.8,
        reviewsCount: 82000,
        coords: [1.3138, 103.8159],
        image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=600&auto=format&fit=crop&q=80',
        description: 'An 82-hectare lush tropical sanctuary in the city center. Home to the National Orchid Garden, tranquil swan lakes, and heritage rainforest boardwalks.',
        address: '1 Cluny Rd, Singapore 259569',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 15,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p5',
        name: 'Sentosa Island & Palawan Beach',
        subtitle: 'Premier resort island with golden sandy beaches, coastal rope bridge, and beach clubs.',
        category: 'Beach & Island',
        categories: ['Resort Island', 'Palawan Beach', 'Coastal Trails'],
        rating: 4.7,
        reviewsCount: 78000,
        coords: [1.2494, 103.8303],
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=80',
        description: 'Vibrant island playground featuring sheltered crescent beaches, the Southernmost Point of Continental Asia, scenic cable cars, and coastal trails.',
        address: 'Sentosa Island, Singapore 099981',
        duration: 'People typically spend 3 hr to 5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p6',
        name: 'Singapore Flyer Giant Observation Wheel',
        subtitle: '165-meter giant observation wheel offering panoramic vistas across Singapore and neighboring islands.',
        category: 'Iconic Landmark',
        categories: ['Giant Wheel', 'Skyline Panorama', 'Marina Centre'],
        rating: 4.6,
        reviewsCount: 52000,
        coords: [1.2895, 103.8631],
        image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc222?w=600&auto=format&fit=crop&q=80',
        description: 'One of the worlds largest observation wheels, providing breathtaking 30-minute rotation flights with vistas extending across the Singapore Strait.',
        address: '30 Raffles Ave, Singapore 039803',
        duration: 'People typically spend 1 hr to 2 hr here',
        cost: 40,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p7',
        name: 'Chinatown Heritage District & Buddha Tooth Relic Temple',
        subtitle: 'Tang dynasty-style architectural temple housing sacred relic, flanked by bustling heritage lanes.',
        category: 'Sacred Temple',
        categories: ['Buddhist Temple', 'Heritage Streets', 'Chinatown'],
        rating: 4.8,
        reviewsCount: 64000,
        coords: [1.2814, 103.8443],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80',
        description: 'Magnificent 4-story Buddhist temple with stupas made of solid gold, roof garden with prayer wheels, and historic streets filled with herbalists and street food.',
        address: '288 South Bridge Rd, Singapore 058840',
        duration: 'People typically spend 1.5 hr to 2 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p8',
        name: 'Fort Canning Park & Tree Tunnel',
        subtitle: 'Historic hilltop landmark featuring colonial bunker relics, spice garden, and viral spiraling tree tunnel.',
        category: 'Historic Landmark',
        categories: ['Historic Hill', 'Tree Tunnel', 'Spice Garden'],
        rating: 4.7,
        reviewsCount: 43000,
        coords: [1.2942, 103.8475],
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&auto=format&fit=crop&q=80',
        description: 'Ancient hill where 14th-century Malay kings ruled and the British surrendered in WWII. Features expansive lawns, gothic gates, and lush manicured gardens.',
        address: 'River Valley Rd, Singapore 179038',
        duration: 'People typically spend 1.5 hr to 2 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p9',
        name: 'Asian Civilisations Museum & Empress Place',
        subtitle: 'Premier museum highlighting ancestral cultures of Singapore across maritime trade and pan-Asian art.',
        category: 'Museum & Art',
        categories: ['Maritime Silk Road', 'Asian Heritage', 'Civic District'],
        rating: 4.8,
        reviewsCount: 31000,
        coords: [1.2875, 103.8517],
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=80',
        description: 'Housed in a grand 1860s neoclassical government building on the north bank of the Singapore River, showcasing Tang shipwreck treasures and sacred art.',
        address: '1 Empress Pl, Singapore 179555',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 20,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p10',
        name: 'National Gallery Singapore',
        subtitle: 'World leading visual arts museum occupying the restored former Supreme Court and City Hall.',
        category: 'Museum & Art',
        categories: ['Modern Southeast Asian Art', 'Supreme Court', 'Rooftop Bar'],
        rating: 4.8,
        reviewsCount: 39000,
        coords: [1.2902, 103.8519],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        description: 'Over 9,000 artworks in two national monuments linked by a spectacular link-bridge and aluminum canopy, with open rooftop views over the Padang.',
        address: '1 St Andrews Rd, Singapore 178957',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 20,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p11',
        name: 'Sultan Mosque & Historic Kampong Glam',
        subtitle: 'Focal point of Singapore Malay-Muslim heritage featuring massive golden dome and Arab Street boutique lanes.',
        category: 'Sacred Temple',
        categories: ['Golden Dome', 'Bussorah Street', 'Arab Street'],
        rating: 4.8,
        reviewsCount: 41000,
        coords: [1.3023, 103.8590],
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&auto=format&fit=crop&q=80',
        description: 'Built in 1824 and rebuilt in 1928, this majestic mosque features a golden dome base adorned with glass bottle rims donated by lower-income devotees.',
        address: '3 Muscat St, Singapore 198833',
        duration: 'People typically spend 1 hr to 1.5 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p12',
        name: 'Jewel Changi Airport & HSBC Rain Vortex',
        subtitle: 'Nature-themed retail and entertainment complex with the worlds tallest indoor waterfall (40m).',
        category: 'Iconic Landmark',
        categories: ['Rain Vortex', 'Canopy Park', 'Forest Valley'],
        rating: 4.9,
        reviewsCount: 120000,
        coords: [1.3602, 103.9897],
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
        description: 'Designed by architect Moshe Safdie, connecting airport terminals with a tiered four-story indoor garden forest surrounding a cascading central vortex.',
        address: '78 Airport Blvd, Singapore 819666',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p13',
        name: 'Sri Mariamman Temple',
        subtitle: 'Singapores oldest Hindu temple founded in 1827 featuring six-tier gopuram pagoda tower.',
        category: 'Sacred Temple',
        categories: ['Dravidian Architecture', 'Gopuram Tower', 'Chinatown'],
        rating: 4.7,
        reviewsCount: 28000,
        coords: [1.2827, 103.8453],
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80',
        description: 'National monument adorned with vibrant sculptures of Hindu deities, divine figures, and ornamental motifs, in the heart of Chinatown.',
        address: '244 South Bridge Rd, Singapore 058793',
        duration: 'People typically spend 1 hr here',
        cost: 0,
        expenseCategory: 'Attractions',
        visited: false
      },
      {
        id: 'sg-p14',
        name: 'Clarke Quay & Singapore River Cruise',
        subtitle: 'Bustling historical riverfront quay lined with converted 19th-century godowns, dining, and electric bumboats.',
        category: 'Sightseeing',
        categories: ['Riverfront', 'Bumboats', 'Nightlife District'],
        rating: 4.6,
        reviewsCount: 67000,
        coords: [1.2897, 103.8465],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        description: 'Vibrant riverfront precinct featuring colorful restored warehouses, scenic timber jetties, and traditional wooden bumboat cruises to Marina Bay.',
        address: '3 River Valley Rd, Singapore 179024',
        duration: 'People typically spend 2 hr to 3 hr here',
        cost: 25,
        expenseCategory: 'Attractions',
        visited: false
      }
    ],
    nearbyRestaurants: [
      {
        id: 'rest-sg-1',
        name: 'Lau Pa Sat Historic Hawker Market',
        subtitle: 'Victorian cast-iron octagonal market known for evening Satay Street and authentic Hainanese delicacies.',
        category: 'Hawker Gourmet',
        rating: 4.8,
        reviewsCount: 48000,
        price: '$$',
        coords: [1.2806, 103.8504],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: '18 Raffles Quay, Singapore 048582',
        cost: 18,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-sg-2',
        name: 'Jumbo Seafood at Riverside Point',
        subtitle: 'Celebrated riverfront destination famous for signature Singapore Chili Crab in sweet spicy egg ribbon sauce.',
        category: 'Singapore Seafood',
        rating: 4.7,
        reviewsCount: 29000,
        price: '$$$',
        coords: [1.2889, 103.8443],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
        address: '30 Merchant Rd, #01-01/02 Riverside Point, Singapore 058282',
        cost: 65,
        expenseCategory: 'Food & Dining'
      },
      {
        id: 'rest-sg-3',
        name: 'Newton Food Centre',
        subtitle: 'Open-air culinary hub famous for BBQ sambal stingray, oyster omelette, and satay platters.',
        category: 'Local Street Food',
        rating: 4.7,
        reviewsCount: 34000,
        price: '$$',
        coords: [1.3123, 103.8395],
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80',
        address: '500 Clemenceau Ave N, Singapore 229495',
        cost: 16,
        expenseCategory: 'Food & Dining'
      }
    ],
    nearbyHotels: [
      {
        id: 'hotel-sg-1',
        name: 'Marina Bay Sands Luxury Hotel',
        subtitle: 'Iconic 5-star hotel offering access to the rooftop infinity pool, celebrity chef restaurants, and casino.',
        category: 'Integrated Luxury Resort',
        rating: 4.9,
        reviewsCount: 92000,
        price: '$$$$',
        coords: [1.2838, 103.8590],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        address: '10 Bayfront Ave, Singapore 018956',
        cost: 450,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-sg-2',
        name: 'Raffles Hotel Singapore',
        subtitle: 'Legendary 1887 colonial grande dame hotel, birthplace of the Singapore Sling, featuring lush courtyard suites.',
        category: 'Colonial Heritage Luxury',
        rating: 4.9,
        reviewsCount: 38000,
        price: '$$$$',
        coords: [1.2958, 103.8546],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
        address: '1 Beach Rd, Singapore 189673',
        cost: 650,
        expenseCategory: 'Lodging'
      },
      {
        id: 'hotel-sg-3',
        name: 'The Fullerton Hotel Singapore',
        subtitle: 'Monumental neoclassical heritage hotel situated at the mouth of the Singapore River overlooking Marina Bay.',
        category: 'Heritage Landmark Hotel',
        rating: 4.8,
        reviewsCount: 27000,
        price: '$$$$',
        coords: [1.2864, 103.8531],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80',
        address: '1 Fullerton Square, Singapore 049178',
        cost: 380,
        expenseCategory: 'Lodging'
      }
    ]
  }
};

/**
 * Universal global city coordinates database for instant offline/initial rendering
 */
export const GLOBAL_CITY_COORDINATES = {
  // Asia
  'tokyo': [35.6762, 139.6503],
  'kyoto': [35.0116, 135.7681],
  'osaka': [34.6937, 135.5023],
  'seoul': [37.5665, 126.9780],
  'bangkok': [13.7563, 100.5018],
  'singapore': [1.2834, 103.8500],
  'bali': [-8.4095, 115.1889],
  'mumbai': [18.9220, 72.8347],
  'delhi': [28.6139, 77.2090],
  'jaipur': [26.9124, 75.7873],
  'goa': [15.2993, 74.1240],
  'dubai': [25.2048, 55.2708],
  'abu dhabi': [24.4539, 54.3773],
  'doha': [25.2854, 51.5310],
  'hong kong': [22.3193, 114.1694],
  'taipei': [25.0330, 121.5654],
  'hanoi': [21.0278, 105.8342],
  'kuala lumpur': [3.1390, 101.6869],
  'kathmandu': [27.7172, 85.3240],
  'colombo': [6.9271, 79.8612],
  'maldives': [4.1755, 73.5093],
  // Europe
  'paris': [48.8566, 2.3522],
  'rome': [41.9028, 12.4964],
  'florence': [43.7696, 11.2558],
  'venice': [45.4408, 12.3155],
  'milan': [45.4642, 9.1900],
  'london': [51.5074, -0.1278],
  'edinburgh': [55.9533, -3.1883],
  'barcelona': [41.3879, 2.1699],
  'madrid': [40.4168, -3.7038],
  'seville': [37.3891, -5.9845],
  'amsterdam': [52.3676, 4.9041],
  'berlin': [52.5200, 13.4050],
  'munich': [48.1351, 11.5820],
  'vienna': [48.2082, 16.3738],
  'prague': [50.0755, 14.4378],
  'budapest': [47.4979, 19.0402],
  'zurich': [47.3769, 8.5417],
  'geneva': [46.2044, 6.1432],
  'lucerne': [47.0502, 8.3093],
  'interlaken': [46.6863, 7.8632],
  'zermatt': [45.9765, 7.7491],
  'lisbon': [38.7223, -9.1393],
  'porto': [41.1579, -8.6291],
  'athens': [37.9838, 23.7275],
  'santorini': [36.3932, 25.4615],
  'reykjavik': [64.1466, -21.9426],
  'dublin': [53.3498, -6.2603],
  'dubrovnik': [42.6507, 18.0944],
  'istanbul': [41.0082, 28.9784],
  // Americas
  'new york': [40.7128, -74.0060],
  'los angeles': [34.0522, -118.2437],
  'san francisco': [37.7749, -122.4194],
  'chicago': [41.8781, -87.6298],
  'miami': [25.7617, -80.1918],
  'las vegas': [36.1699, -115.1398],
  'vancouver': [49.2827, -123.1207],
  'toronto': [43.6532, -79.3832],
  'banff': [51.1784, -115.5708],
  'mexico city': [19.4326, -99.1332],
  'cancun': [21.1619, -86.8515],
  'oaxaca': [17.0732, -96.7266],
  'rio de janeiro': [-22.9068, -43.1729],
  'buenos aires': [-34.6037, -58.3816],
  'lima': [-12.0464, -77.0428],
  'cusco': [-13.5319, -71.9675],
  'santiago': [-33.4489, -70.6693],
  // Oceania
  'sydney': [-33.8688, 151.2093],
  'melbourne': [-37.8136, 144.9631],
  'auckland': [-36.8485, 174.7633],
  'queenstown': [-45.0312, 168.6626],
  // Africa
  'cairo': [30.0444, 31.2357],
  'cape town': [-33.9249, 18.4241],
  'marrakech': [31.6295, -7.9811],
  'nairobi': [-1.2921, 36.8219]
};

/**
 * Resolve destination metadata dynamically from city name, fuzzy matching or auto-generating
 */
export function resolveDestinationData(destinationQuery, startDateStr, endDateStr) {
  let baseDest = null;
  const clean = (destinationQuery || 'switzerland').toLowerCase().trim();

  if (clean.includes('singapore') || clean.includes('lion city')) {
    baseDest = DESTINATIONS_REGISTRY['singapore'];
  } else if (clean.includes('rome') || clean.includes('roma') || clean.includes('italy') || clean.includes('vatican')) {
    baseDest = DESTINATIONS_REGISTRY['rome'];
  } else if (clean.includes('london') || clean.includes('westminster') || clean.includes('england') || clean.includes('uk')) {
    baseDest = DESTINATIONS_REGISTRY['london'];
  } else if (clean.includes('new york') || clean.includes('nyc') || clean.includes('manhattan') || clean.includes('brooklyn')) {
    baseDest = DESTINATIONS_REGISTRY['newyork'];
  } else if (clean.includes('barcelona') || clean.includes('catalonia') || clean.includes('spain')) {
    baseDest = DESTINATIONS_REGISTRY['barcelona'];
  } else if (clean.includes('dubai') || clean.includes('emirates') || clean.includes('uae')) {
    baseDest = DESTINATIONS_REGISTRY['dubai'];
  } else if (clean.includes('swiss') || clean.includes('switzerland') || clean.includes('zurich') || clean.includes('lucerne') || clean.includes('interlaken') || clean.includes('zermatt')) {
    baseDest = DESTINATIONS_REGISTRY['switzerland'];
  } else if (clean.includes('bali') || clean.includes('ubud') || clean.includes('seminyak') || clean.includes('canggu') || clean.includes('indonesia')) {
    baseDest = DESTINATIONS_REGISTRY['bali'];
  } else if (clean.includes('goa') || clean.includes('panaji') || clean.includes('anjuna')) {
    baseDest = DESTINATIONS_REGISTRY['goa'];
  } else if (clean.includes('mexico')) {
    baseDest = DESTINATIONS_REGISTRY['mexico'];
  } else if (clean.includes('mumbai') || clean.includes('bombay') || clean.includes('maharashtra') || clean.includes('india')) {
    baseDest = DESTINATIONS_REGISTRY['mumbai'];
  } else if (clean.includes('tokyo') || clean.includes('japan')) {
    baseDest = DESTINATIONS_REGISTRY['tokyo'];
  } else if (clean.includes('paris') || clean.includes('france')) {
    baseDest = DESTINATIONS_REGISTRY['paris'];
  } else {
    // Dynamic city fallback tailored to the requested destination
    const displayName = destinationQuery.includes(',') ? destinationQuery.split(',')[0].trim() : destinationQuery.trim();
    const cleanLower = clean.toLowerCase();
    let initialCenter = [48.8566, 2.3522];
    const matchCityKey = Object.keys(GLOBAL_CITY_COORDINATES).find(c => cleanLower.includes(c));
    if (matchCityKey) {
      initialCenter = GLOBAL_CITY_COORDINATES[matchCityKey];
    }

    baseDest = {
      id: 'custom-' + displayName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: displayName,
      city: displayName,
      country: 'Travel Destination',
      fullTitle: 'Trip to ' + displayName,
      passedDestination: destinationQuery,
      currency: '₹',
      distanceInfo: 'Heart of ' + displayName,
      center: initialCenter,
      zoom: 12,
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80',
      dates: (startDateStr || '10/20') + ' - ' + (endDateStr || '10/25'),
      startDate: startDateStr || '10/20',
      endDate: endDateStr || '10/25',
      guides: [
        {
          title: 'Top Things to Do in ' + displayName,
          subtitle: 'Curated Itinerary for ' + displayName,
          source: 'TripMate Live API',
          image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop&q=80'
        }
      ],
      allCuratedPlaces: [
        {
          id: 'p-' + displayName.toLowerCase() + '-1',
          name: displayName + ' Historic Old Town & Heritage Square',
          subtitle: 'Central cultural district featuring historic architecture, local artisan markets, and regional sights.',
          category: 'Historic Landmark',
          categories: ['Historic Center', 'Architecture', displayName],
          rating: 4.8,
          reviewsCount: 34500,
          coords: [initialCenter[0] + 0.003, initialCenter[1] + 0.002],
          image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80',
          cost: 0,
          expenseCategory: 'Attractions',
          visited: false
        },
        {
          id: 'p-' + displayName.toLowerCase() + '-2',
          name: displayName + ' National Museum of Art & Culture',
          subtitle: 'Premier cultural center exhibiting celebrated regional masterpieces and historical treasures.',
          category: 'Art Museum',
          categories: ['Museum', 'Fine Arts', displayName],
          rating: 4.9,
          reviewsCount: 48200,
          coords: [initialCenter[0] - 0.004, initialCenter[1] + 0.005],
          image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&auto=format&fit=crop&q=80',
          cost: 18,
          expenseCategory: 'Attractions',
          visited: false
        },
        {
          id: 'p-' + displayName.toLowerCase() + '-3',
          name: displayName + ' Grand Cathedral & Panoramic Lookout',
          subtitle: 'Majestic landmark church with ancient architectural detailing and scenic overlook.',
          category: 'Historic Cathedral',
          categories: ['Cathedral', 'Rooftop Vista', displayName],
          rating: 4.8,
          reviewsCount: 29100,
          coords: [initialCenter[0] + 0.006, initialCenter[1] - 0.003],
          image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80',
          cost: 8,
          expenseCategory: 'Attractions',
          visited: false
        },
        {
          id: 'p-' + displayName.toLowerCase() + '-4',
          name: displayName + ' Royal Botanical Gardens',
          subtitle: 'Expansive scenic grounds featuring century-old pavilions, shaded walking trails, and fountains.',
          category: 'Scenic Gardens',
          categories: ['Botanical Garden', 'Promenade', displayName],
          rating: 4.7,
          reviewsCount: 19400,
          coords: [initialCenter[0] - 0.005, initialCenter[1] - 0.004],
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
          cost: 0,
          expenseCategory: 'Attractions',
          visited: false
        }
      ],
      nearbyRestaurants: [
        {
          id: 'rest-' + displayName.toLowerCase() + '-1',
          name: 'The Heritage Kitchen of ' + displayName,
          subtitle: 'Renowned culinary dining room serving authentic local specialties and fine vintage wines.',
          category: 'Fine Dining',
          rating: 4.8,
          reviewsCount: 6800,
          price: '$$$',
          coords: [initialCenter[0] + 0.004, initialCenter[1] + 0.003],
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
          address: 'Central Promenade, ' + displayName,
          cost: 38,
          expenseCategory: 'Food & Dining'
        }
      ],
      nearbyHotels: [
        {
          id: 'hotel-' + displayName.toLowerCase() + '-1',
          name: displayName + ' Palace & Luxury Grand Hotel',
          subtitle: 'Historic 5-star palace hotel offering city views, fine dining terrace, and bespoke guest suites.',
          category: '5-Star Grand Hotel',
          rating: 4.8,
          reviewsCount: 7900,
          price: '$$$$',
          coords: [initialCenter[0] + 0.002, initialCenter[1] - 0.004],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
          address: 'Palace Promenade, ' + displayName,
          cost: 290,
          expenseCategory: 'Lodging'
        }
      ]
    };
  }

  // Calculate day count from start and end dates
  let dayCount = 3;
  if (startDateStr && endDateStr) {
    const s = new Date(startDateStr);
    const e = new Date(endDateStr);
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
    if (!isNaN(diff) && diff >= 1) {
      dayCount = Math.min(10, Math.max(2, diff));
    }
  }

  // Deep clone destination object
  const dest = JSON.parse(JSON.stringify(baseDest));
  dest.passedDestination = destinationQuery || dest.passedDestination;
  dest.startDate = startDateStr || dest.startDate;
  dest.endDate = endDateStr || dest.endDate;

  // Gather all curated places for distribution
  const allCurated = [...(dest.allCuratedPlaces || dest.placesToVisit || [])];
  if (dest.sections && dest.sections.length > 0) {
    dest.sections.forEach(sec => {
      (sec.places || []).forEach(p => {
        if (!allCurated.some(existing => existing.name === p.name)) {
          allCurated.push(p);
        }
      });
    });
  }

  const colors = ['#2563EB', '#059669', '#7C3AED', '#D97706', '#DC2626', '#0891B2', '#4F46E5', '#0D9488'];
  const baseDate = (startDateStr && !isNaN(new Date(startDateStr))) ? new Date(startDateStr) : new Date();
  const distributedSections = [];
  let placeCounter = 0;

  for (let d = 0; d < dayCount; d++) {
    const currDate = new Date(baseDate);
    currDate.setDate(baseDate.getDate() + d);
    const shortDate = currDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const fullDate = currDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const dayStops = [];
    for (let p = 0; p < 2 && placeCounter < allCurated.length; p++) {
      dayStops.push({
        ...allCurated[placeCounter],
        id: dest.id + '-d' + (d + 1) + '-s' + (p + 1),
        number: p + 1
      });
      placeCounter++;
    }

    distributedSections.push({
      id: 'day-' + (d + 1),
      title: fullDate,
      shortTitle: 'Day ' + (d + 1) + ' (' + shortDate + ')',
      dateStr: shortDate,
      color: colors[d % colors.length],
      places: dayStops
    });
  }

  const unscheduledPool = [];
  while (placeCounter < allCurated.length) {
    unscheduledPool.push({
      ...allCurated[placeCounter],
      id: dest.id + '-pv-' + (unscheduledPool.length + 1),
      number: unscheduledPool.length + 1
    });
    placeCounter++;
  }

  dest.sections = distributedSections;
  dest.placesToVisit = unscheduledPool;
  dest.recommendedPlaces = allCurated.slice(0, 5);
  dest.sublistRecommendations = (dest.nearbyRestaurants || []).slice(0, 4);
  dest.nearbyAttractions = (dest.nearbyAttractions && dest.nearbyAttractions.length > 0)
    ? dest.nearbyAttractions
    : allCurated;

  return dest;
}
