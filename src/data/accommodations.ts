import { Accommodation } from '../types';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'srm-scholars-haven',
    title: "The Scholar's Haven PG",
    type: 'PG',
    genderPreference: 'Boys',
    roomSharing: 'Single',
    collegeNearby: 'SRM Institute of Science & Technology',
    distanceKm: 0.3,
    distanceText: '300m from SRM Kattankulathur Gate 1',
    area: 'Potheri, Kattankulathur',
    city: 'Chennai',
    monthlyRent: 8500,
    deposit: 17000,
    rating: 4.8,
    reviewsCount: 38,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Laundry', 'Security', 'Study Desk', 'Power Backup', 'Housekeeping'],
    safetyFeatures: ['24/7 CCTV surveillance', 'Biometric entry gate', 'Night security guard', 'Fire safety equipment'],
    transportNearby: ['Potheri Local Railway Station (400m)', 'SRM Bus Stop (250m)', 'Auto stand at gate'],
    colleges: ['SRM IST Kattankulathur', 'Valliammai Engineering College', 'SRM Medical College'],
    description: "Quiet and well-maintained student accommodation located just 300 meters from the SRM University campus. Designed specifically for engineering and medical students who need dedicated study environments, wholesome home-style meals, and reliable high-speed Wi-Fi.",
    studentReviews: [
      {
        author: 'Arun Karthik',
        college: 'SRM B.Tech CSE',
        rating: 5,
        date: 'August 2026',
        comment: 'Super peaceful environment for semester prep. The Wi-Fi is consistently fast and the food feels like home.'
      },
      {
        author: 'Naveen Kumar',
        college: 'SRM Mechanical',
        rating: 4.5,
        date: 'July 2026',
        comment: 'Walking distance to class saved me countless hours. Very clean bathrooms and responsive warden.'
      },
      {
        author: 'Siddharth M.',
        college: 'SRM Biotechnology',
        rating: 5,
        date: 'June 2026',
        comment: 'Biometric gate makes it very safe. Electricity backup works without hiccups during storms.'
      }
    ],
    visualTheme: 'study_haven',
    roomLabel: 'Single Private Room with Ergonomic Study Desk & High-Speed Wi-Fi',
    coverImage: '/images/srm-scholars-haven-pg.webp',
    galleryImages: [
      '/images/srm-scholars-haven-pg.webp',
      '/images/anna-tech-quarters-pg.webp',
      '/images/stella-serenity-women-pg.webp',
      '/images/vadapalani-metro-suites-pg.webp'
    ],
    originCoord: [340, 200],
    landmarks: [
      {
        id: 'lm-srm-gate',
        name: 'SRM Main Campus Arch Gate 1',
        type: 'campus_gate',
        x: 230,
        y: 130,
        distanceMeters: 300,
        walkingMinutes: 4,
        pathPoints: [[340, 200], [280, 200], [280, 150], [230, 130]]
      },
      {
        id: 'lm-srm-lib',
        name: 'University Central Library & Tech Park',
        type: 'library',
        x: 160,
        y: 80,
        distanceMeters: 450,
        walkingMinutes: 6,
        pathPoints: [[340, 200], [280, 200], [280, 120], [200, 100], [160, 80]]
      },
      {
        id: 'lm-srm-canteen',
        name: 'Campus Food Court & Java Cafe',
        type: 'canteen',
        x: 390,
        y: 110,
        distanceMeters: 350,
        walkingMinutes: 5,
        pathPoints: [[340, 200], [380, 200], [380, 130], [390, 110]]
      },
      {
        id: 'lm-srm-train',
        name: 'Potheri Suburban Railway Station',
        type: 'metro',
        x: 480,
        y: 280,
        distanceMeters: 420,
        walkingMinutes: 6,
        pathPoints: [[340, 200], [420, 200], [420, 280], [480, 280]]
      },
      {
        id: 'lm-srm-pharm',
        name: 'Apollo Pharmacy & Student Clinic',
        type: 'pharmacy',
        x: 250,
        y: 310,
        distanceMeters: 280,
        walkingMinutes: 4,
        pathPoints: [[340, 200], [290, 200], [290, 310], [250, 310]]
      },
      {
        id: 'lm-srm-market',
        name: 'GST Road Student Market & ATM',
        type: 'market',
        x: 520,
        y: 180,
        distanceMeters: 550,
        walkingMinutes: 7,
        pathPoints: [[340, 200], [440, 200], [520, 180]]
      }
    ]
  },
  {
    id: 'loyola-residency-girls',
    title: 'Loyola Residency & Girls Hostel',
    type: 'Hostel',
    genderPreference: 'Girls',
    roomSharing: 'Double',
    collegeNearby: 'Loyola College',
    distanceKm: 0.5,
    distanceText: '500m from Loyola College Main Gate',
    area: 'Sterling Road, Nungambakkam',
    city: 'Chennai',
    monthlyRent: 9500,
    deposit: 19000,
    rating: 4.9,
    reviewsCount: 52,
    isVerified: true,
    availability: 'Few Beds Left',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Security', 'Laundry', 'Study Desk', 'Water Purifier'],
    safetyFeatures: ['Female resident warden on premise', '24/7 CCTV in common areas', 'Visitor register & ID check', 'Emergency medical kit'],
    transportNearby: ['Nungambakkam Railway Station (800m)', 'Sterling Road Bus Stop (150m)', 'Metro Station (1.2km)'],
    colleges: ['Loyola College', 'MOP Vaishnav College', 'Stella Maris College'],
    description: 'A secure, serene women student hostel situated right in heart of Nungambakkam. Offering healthy South & North Indian meals, round-the-clock female warden supervision, and bright airy twin-sharing rooms.',
    studentReviews: [
      {
        author: 'Pooja Venkatesh',
        college: 'Loyola Commerce',
        rating: 5,
        date: 'September 2026',
        comment: 'My parents were very relieved with the security here. The warden treats us with kindness and care.'
      },
      {
        author: 'Divya Ramesh',
        college: 'MOP Vaishnav',
        rating: 5,
        date: 'August 2026',
        comment: 'Terrific location with great bus connectivity. The study hours in the library room are respected by everyone.'
      },
      {
        author: 'Ananya S.',
        college: 'Loyola Economics',
        rating: 4.5,
        date: 'July 2026',
        comment: 'Clean rooms with daily housekeeping. The food menu has decent variety.'
      }
    ],
    visualTheme: 'balcony_twin',
    roomLabel: 'Twin Sharing Room with Individual Wardrobes & Attached Washroom',
    coverImage: '/images/loyola-residency-hostel.webp',
    galleryImages: [
      '/images/loyola-residency-hostel.webp',
      '/images/tambaram-greenway-hostel.webp',
      '/images/ssn-omr-tech-hostel.webp',
      '/images/about-student-living.webp'
    ],
    originCoord: [360, 220],
    landmarks: [
      {
        id: 'lm-loy-gate',
        name: 'Loyola College Main Entrance',
        type: 'campus_gate',
        x: 480,
        y: 120,
        distanceMeters: 500,
        walkingMinutes: 6,
        pathPoints: [[360, 220], [420, 220], [420, 140], [480, 120]]
      },
      {
        id: 'lm-loy-lib',
        name: 'Loyola Central Library Building',
        type: 'library',
        x: 560,
        y: 90,
        distanceMeters: 650,
        walkingMinutes: 8,
        pathPoints: [[360, 220], [420, 220], [480, 140], [560, 90]]
      },
      {
        id: 'lm-loy-bus',
        name: 'Sterling Road Bus Terminus',
        type: 'bus_stop',
        x: 270,
        y: 200,
        distanceMeters: 180,
        walkingMinutes: 2,
        pathPoints: [[360, 220], [300, 220], [270, 200]]
      },
      {
        id: 'lm-loy-canteen',
        name: 'Sterling Square Student Food Hub',
        type: 'canteen',
        x: 320,
        y: 330,
        distanceMeters: 320,
        walkingMinutes: 4,
        pathPoints: [[360, 220], [360, 300], [320, 330]]
      },
      {
        id: 'lm-loy-metro',
        name: 'Nungambakkam Local Railway',
        type: 'metro',
        x: 180,
        y: 260,
        distanceMeters: 800,
        walkingMinutes: 10,
        pathPoints: [[360, 220], [280, 220], [240, 260], [180, 260]]
      }
    ]
  },
  {
    id: 'anna-univ-tech-quarters',
    title: 'Anna Tech Quarters Student PG',
    type: 'PG',
    genderPreference: 'Boys',
    roomSharing: 'Double',
    collegeNearby: 'Anna University',
    distanceKm: 0.4,
    distanceText: '400m from Anna University CEG Gate',
    area: 'Gandhi Mandapam Road, Guindy',
    city: 'Chennai',
    monthlyRent: 7800,
    deposit: 15600,
    rating: 4.7,
    reviewsCount: 29,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'Study Desk', 'Security', 'Laundry', 'Power Backup'],
    safetyFeatures: ['Access card gate', 'CCTV monitoring', 'Security personnel on shifts', 'Well-lit approach road'],
    transportNearby: ['Guindy Metro Station (900m)', 'Little Mount Metro (1km)', 'Anna University Bus Stand (350m)'],
    colleges: ['Anna University (CEG, ACTECH, SAP)', 'IIT Madras', 'Alagappa College of Technology'],
    description: 'Premier student PG built tailored for Anna University scholars. Features silent study desks with individual power points, high-speed fiber internet, and balanced vegetarian meals prepared fresh thrice daily.',
    studentReviews: [
      {
        author: 'Karthik Subramanian',
        college: 'Anna Univ CEG',
        rating: 5,
        date: 'September 2026',
        comment: 'Very short walk to the College of Engineering Guindy campus. The management is student-friendly.'
      },
      {
        author: 'Vigneshwaran P.',
        college: 'ACTECH Chemical',
        rating: 4.5,
        date: 'July 2026',
        comment: 'Great value for money considering the prime Guindy location. Clean drinking water always available.'
      },
      {
        author: 'Rohit Balaji',
        college: 'Anna Univ Mechanical',
        rating: 4.5,
        date: 'June 2026',
        comment: 'Fast internet which is essential for projects and online research. Recommended.'
      }
    ],
    visualTheme: 'sunset_room',
    roomLabel: 'Double Occupancy Room with Dual Oak Workstations',
    coverImage: '/images/anna-tech-quarters-pg.webp',
    galleryImages: [
      '/images/anna-tech-quarters-pg.webp',
      '/images/srm-scholars-haven-pg.webp',
      '/images/vadapalani-metro-suites-pg.webp',
      '/images/stella-serenity-women-pg.webp'
    ],
    originCoord: [380, 210],
    landmarks: [
      {
        id: 'lm-anna-ceg',
        name: 'College of Engineering Guindy (CEG) Gate',
        type: 'campus_gate',
        x: 270,
        y: 110,
        distanceMeters: 400,
        walkingMinutes: 5,
        pathPoints: [[380, 210], [320, 210], [320, 130], [270, 110]]
      },
      {
        id: 'lm-anna-lib',
        name: 'Anna Centenary Library & Research Complex',
        type: 'library',
        x: 520,
        y: 140,
        distanceMeters: 620,
        walkingMinutes: 8,
        pathPoints: [[380, 210], [440, 210], [480, 160], [520, 140]]
      },
      {
        id: 'lm-anna-metro',
        name: 'Little Mount Metro Station',
        type: 'metro',
        x: 210,
        y: 310,
        distanceMeters: 780,
        walkingMinutes: 10,
        pathPoints: [[380, 210], [300, 210], [240, 280], [210, 310]]
      },
      {
        id: 'lm-anna-bus',
        name: 'Gandhi Mandapam Bus Stop',
        type: 'bus_stop',
        x: 430,
        y: 280,
        distanceMeters: 310,
        walkingMinutes: 4,
        pathPoints: [[380, 210], [430, 240], [430, 280]]
      },
      {
        id: 'lm-anna-food',
        name: 'Kotturpuram Student Tea Stall & Mess',
        type: 'canteen',
        x: 540,
        y: 270,
        distanceMeters: 480,
        walkingMinutes: 6,
        pathPoints: [[380, 210], [460, 210], [510, 250], [540, 270]]
      }
    ]
  },
  {
    id: 'aura-coliving-adyar',
    title: 'Aura Student Coliving & Flats',
    type: 'Flat',
    genderPreference: 'Unisex',
    roomSharing: 'Entire Flat',
    collegeNearby: 'IIT Madras',
    distanceKm: 1.1,
    distanceText: '1.1km from IIT Madras Adyar Gate',
    area: 'Gandhi Nagar, Adyar',
    city: 'Chennai',
    monthlyRent: 16500,
    deposit: 33000,
    rating: 4.9,
    reviewsCount: 44,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'AC', 'Security', 'Laundry', 'Study Desk', 'Modular Kitchen', 'Power Backup', 'Gym'],
    safetyFeatures: ['24/7 Gated society security', 'Video door phone', 'Smart digital door locks', 'Fire sprinklers'],
    transportNearby: ['Adyar Depot Bus Stand (500m)', 'Kasturibai Nagar MRTS (900m)', 'E-bike rental dock outside'],
    colleges: ['IIT Madras', 'Asian College of Journalism', 'NIFT Chennai'],
    description: 'Fully furnished 2BHK flat setup optimized for university students and researchers sharing together. Includes modular kitchenette, air-conditioned bedrooms, and bright common living space.',
    studentReviews: [
      {
        author: 'Meera Nambiar',
        college: 'IIT Madras Research Scholar',
        rating: 5,
        date: 'August 2026',
        comment: 'Best student flat experience in Adyar. No intrusive landlord hassles and zero brokerage fees.'
      },
      {
        author: 'Tarun Joshi',
        college: 'NIFT Fashion Tech',
        rating: 5,
        date: 'July 2026',
        comment: 'Super modern setup with plenty of natural daylight. We love having our own kitchen for midnight snacks.'
      },
      {
        author: 'Rhea Sen',
        college: 'Asian College of Journalism',
        rating: 4.8,
        date: 'May 2026',
        comment: 'High standards of hygiene and maintenance. Building community is very friendly and respectful.'
      }
    ],
    visualTheme: 'community_lounge',
    roomLabel: 'Furnished Living & Study Suite with Balcony & Kitchenette',
    coverImage: '/images/aura-coliving-flat.webp',
    galleryImages: [
      '/images/aura-coliving-flat.webp',
      '/images/kotturpuram-studio-flat.webp',
      '/images/thoraipakkam-shared-loft.webp',
      '/images/about-student-living.webp'
    ],
    originCoord: [320, 240],
    landmarks: [
      {
        id: 'lm-iit-gate',
        name: 'IIT Madras Main Gate (Adyar)',
        type: 'campus_gate',
        x: 460,
        y: 120,
        distanceMeters: 850,
        walkingMinutes: 11,
        pathPoints: [[320, 240], [390, 240], [420, 160], [460, 120]]
      },
      {
        id: 'lm-adyar-depot',
        name: 'Adyar Bus Terminus & Depot',
        type: 'bus_stop',
        x: 210,
        y: 200,
        distanceMeters: 450,
        walkingMinutes: 6,
        pathPoints: [[320, 240], [260, 240], [210, 200]]
      },
      {
        id: 'lm-iit-canteen',
        name: 'Himalaya Food Court Corridor',
        type: 'canteen',
        x: 580,
        y: 150,
        distanceMeters: 1100,
        walkingMinutes: 14,
        pathPoints: [[320, 240], [420, 240], [500, 180], [580, 150]]
      },
      {
        id: 'lm-adyar-market',
        name: 'Adyar Bakery & Student Supermarket',
        type: 'market',
        x: 280,
        y: 340,
        distanceMeters: 380,
        walkingMinutes: 5,
        pathPoints: [[320, 240], [320, 310], [280, 340]]
      }
    ]
  },
  {
    id: 'mcc-tambaram-greenway',
    title: 'Tambaram Greenway Student Hostel',
    type: 'Hostel',
    genderPreference: 'Boys',
    roomSharing: 'Triple',
    collegeNearby: 'Madras Christian College (MCC)',
    distanceKm: 0.6,
    distanceText: '600m from Madras Christian College Campus',
    area: 'East Tambaram',
    city: 'Chennai',
    monthlyRent: 6500,
    deposit: 13000,
    rating: 4.6,
    reviewsCount: 31,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'Security', 'Laundry', 'Study Desk', 'Indoor Games'],
    safetyFeatures: ['CCTV surveillance', 'Warden rounds every evening', 'Emergency doctor on call', 'First aid facility'],
    transportNearby: ['Tambaram Railway Station & Bus Terminus (700m)', 'MCC Main Bus Stop (400m)'],
    colleges: ['Madras Christian College', 'Bharath University', 'GSS Jain College'],
    description: 'Affordable, sociable student hostel in East Tambaram. Features spacious rooms, wholesome Tamil Nadu & North Indian mess meals, and strong community vibe for undergrad students.',
    studentReviews: [
      {
        author: 'Samuel George',
        college: 'MCC History',
        rating: 4.5,
        date: 'September 2026',
        comment: 'Pocket-friendly rent with food included. Very close to the Tambaram local railway station.'
      },
      {
        author: 'Prasanna Raj',
        college: 'MCC B.Sc Physics',
        rating: 4.5,
        date: 'August 2026',
        comment: 'Friendly roommates and supportive warden. Mess staff is very accommodating with meal timings.'
      },
      {
        author: 'Dinesh V.',
        college: 'Bharath University',
        rating: 4.8,
        date: 'July 2026',
        comment: 'Good camaraderie among students. The terrace study area in the evenings is fantastic.'
      }
    ],
    visualTheme: 'greenway_dorm',
    roomLabel: 'Triple Bed Sharing with Personal Lockers & Common Study Zone',
    coverImage: '/images/tambaram-greenway-hostel.webp',
    galleryImages: [
      '/images/tambaram-greenway-hostel.webp',
      '/images/loyola-residency-hostel.webp',
      '/images/ssn-omr-tech-hostel.webp',
      '/images/about-student-living.webp'
    ],
    originCoord: [350, 220],
    landmarks: [
      {
        id: 'lm-mcc-gate',
        name: 'MCC Heritage Campus Gate',
        type: 'campus_gate',
        x: 240,
        y: 110,
        distanceMeters: 600,
        walkingMinutes: 8,
        pathPoints: [[350, 220], [280, 220], [280, 140], [240, 110]]
      },
      {
        id: 'lm-tam-train',
        name: 'Tambaram Railway Junction',
        type: 'metro',
        x: 480,
        y: 310,
        distanceMeters: 700,
        walkingMinutes: 9,
        pathPoints: [[350, 220], [420, 220], [450, 280], [480, 310]]
      },
      {
        id: 'lm-mcc-canteen',
        name: 'Miller Memorial Food Corner',
        type: 'canteen',
        x: 310,
        y: 100,
        distanceMeters: 550,
        walkingMinutes: 7,
        pathPoints: [[350, 220], [350, 150], [310, 100]]
      }
    ]
  },
  {
    id: 'stella-serenity-women',
    title: 'Stella Serenity PG for Women',
    type: 'PG',
    genderPreference: 'Girls',
    roomSharing: 'Single',
    collegeNearby: 'Stella Maris College',
    distanceKm: 0.4,
    distanceText: '400m from Stella Maris College Gate',
    area: 'Cathedral Road, Gopalapuram',
    city: 'Chennai',
    monthlyRent: 11000,
    deposit: 22000,
    rating: 4.9,
    reviewsCount: 47,
    isVerified: true,
    availability: 'From Next Month',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Security', 'Laundry', 'Study Desk', 'Power Backup', 'Housekeeping'],
    safetyFeatures: ['Full-time female warden', 'Biometric fingerprint entry', 'Security guard 24/7', 'CCTV monitoring'],
    transportNearby: ['Cathedral Road Bus Stop (100m)', 'AG-DMS Metro Station (850m)', 'Semmozhi Poonga nearby'],
    colleges: ['Stella Maris College', 'SIET College', 'Ethiraj College'],
    description: 'Boutique premium women’s PG in prime central Chennai. Safe neighbourhood, air-conditioned rooms, hygienic homemade food, and peaceful study atmosphere just 5 minutes walk from Stella Maris.',
    studentReviews: [
      {
        author: 'Shalini Sundar',
        college: 'Stella Maris English Lit',
        rating: 5,
        date: 'August 2026',
        comment: 'The best PG around Stella Maris! The rooms are so aesthetic, safe, and impeccably cleaned daily.'
      },
      {
        author: 'Aparna Krishnan',
        college: 'Stella Maris Fine Arts',
        rating: 5,
        date: 'July 2026',
        comment: 'Warden aunty makes you feel at home immediately. Food is healthy and never oily.'
      },
      {
        author: 'Sneha Mohan',
        college: 'SIET College',
        rating: 4.8,
        date: 'June 2026',
        comment: 'Reliable power backup during summer heat. The metro station is within comfortable walking distance.'
      }
    ],
    visualTheme: 'classic_quarters',
    roomLabel: 'Executive Single Room with AC, Wardrobe & Attached Bath',
    coverImage: '/images/stella-serenity-women-pg.webp',
    galleryImages: [
      '/images/stella-serenity-women-pg.webp',
      '/images/srm-scholars-haven-pg.webp',
      '/images/anna-tech-quarters-pg.webp',
      '/images/vadapalani-metro-suites-pg.webp'
    ],
    originCoord: [330, 230],
    landmarks: [
      {
        id: 'lm-stella-gate',
        name: 'Stella Maris College Entrance',
        type: 'campus_gate',
        x: 450,
        y: 110,
        distanceMeters: 400,
        walkingMinutes: 5,
        pathPoints: [[330, 230], [410, 230], [410, 150], [450, 110]]
      },
      {
        id: 'lm-stella-metro',
        name: 'AG-DMS Metro Station',
        type: 'metro',
        x: 210,
        y: 320,
        distanceMeters: 850,
        walkingMinutes: 11,
        pathPoints: [[330, 230], [270, 230], [230, 280], [210, 320]]
      },
      {
        id: 'lm-stella-pharm',
        name: 'Cathedral Meds & Grocery',
        type: 'pharmacy',
        x: 370,
        y: 160,
        distanceMeters: 220,
        walkingMinutes: 3,
        pathPoints: [[330, 230], [370, 200], [370, 160]]
      }
    ]
  },
  {
    id: 'egmore-heritage-rooms',
    title: 'Egmore Heritage Student Rooms',
    type: 'Shared Room',
    genderPreference: 'Girls',
    roomSharing: 'Double',
    collegeNearby: 'Ethiraj College for Women',
    distanceKm: 0.5,
    distanceText: '500m from Ethiraj College Main Campus',
    area: 'Commander-in-Chief Road, Egmore',
    city: 'Chennai',
    monthlyRent: 8200,
    deposit: 16400,
    rating: 4.7,
    reviewsCount: 33,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'Security', 'Study Desk', 'Laundry', 'Power Backup'],
    safetyFeatures: ['24/7 security booth', 'CCTV surveillance', 'Warden assistance', 'Fire safety certificates'],
    transportNearby: ['Egmore Metro & Railway Station (700m)', 'Ethiraj Salai Bus Stop (200m)'],
    colleges: ['Ethiraj College for Women', 'Madras Medical College', 'Women’s Christian College'],
    description: 'Charming and peaceful student accommodation designed for Ethiraj College and medical students. Spacious twin-sharing rooms with large desks, natural light, and supportive environment.',
    studentReviews: [
      {
        author: 'Keerthana R.',
        college: 'Ethiraj College Commerce',
        rating: 4.8,
        date: 'September 2026',
        comment: 'Location is unbeatable for Ethiraj students. Walking back from college takes under seven minutes.'
      },
      {
        author: 'Bhavna Jain',
        college: 'Ethiraj College Corporate Sec',
        rating: 4.7,
        date: 'August 2026',
        comment: 'Spacious desk setups for exam weeks. Staff takes care of any repair complaints within 24 hours.'
      },
      {
        author: 'Radhika S.',
        college: 'MMC MBBS',
        rating: 4.6,
        date: 'July 2026',
        comment: 'Quiet nighttime policy makes it easy to study late without interruptions.'
      }
    ],
    visualTheme: 'oak_minimalist',
    roomLabel: 'Twin Bedroom with Solid Pine Workspaces & Shelving',
    coverImage: '/images/egmore-heritage-shared-room.webp',
    galleryImages: [
      '/images/egmore-heritage-shared-room.webp',
      '/images/thoraipakkam-shared-loft.webp',
      '/images/nungambakkam-manor-coliving.webp',
      '/images/about-student-living.webp'
    ],
    originCoord: [350, 210],
    landmarks: [
      {
        id: 'lm-eth-gate',
        name: 'Ethiraj College Main Gate',
        type: 'campus_gate',
        x: 460,
        y: 120,
        distanceMeters: 500,
        walkingMinutes: 6,
        pathPoints: [[350, 210], [410, 210], [410, 150], [460, 120]]
      },
      {
        id: 'lm-eg-metro',
        name: 'Egmore Metro Station',
        type: 'metro',
        x: 230,
        y: 290,
        distanceMeters: 700,
        walkingMinutes: 9,
        pathPoints: [[350, 210], [280, 210], [250, 260], [230, 290]]
      }
    ]
  },
  {
    id: 'ssn-omr-tech-hostel',
    title: 'OMR Tech Corridor Boys Hostel',
    type: 'Hostel',
    genderPreference: 'Boys',
    roomSharing: 'Double',
    collegeNearby: 'SSN College of Engineering',
    distanceKm: 0.8,
    distanceText: '800m from SSN College Kalavakkam Entrance',
    area: 'Kalavakkam, Old Mahabalipuram Road',
    city: 'Chennai',
    monthlyRent: 7200,
    deposit: 14400,
    rating: 4.8,
    reviewsCount: 36,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Security', 'Laundry', 'Study Desk', 'Power Backup'],
    safetyFeatures: ['Compound wall with 24/7 guard', 'CCTV cameras', 'Entry logbook', 'Fire extinguishers on each floor'],
    transportNearby: ['SSN Bus Stop (400m)', 'OMR Express Shuttle (600m)'],
    colleges: ['SSN College of Engineering', 'Shiv Nadar University Chennai', 'VIT Chennai'],
    description: 'Specially structured for SSN and Shiv Nadar University engineering scholars. Features uninterrupted high-bandwidth Wi-Fi for coding and research, 3 hot meals daily, and comfortable twin AC rooms.',
    studentReviews: [
      {
        author: 'Abhishek Nair',
        college: 'SSN EEE',
        rating: 5,
        date: 'August 2026',
        comment: 'Hostel high-speed Wi-Fi handles heavy downloads and hackathons effortlessly. Mess food is good.'
      },
      {
        author: 'Gautam Chettiar',
        college: 'SSN Computer Science',
        rating: 4.8,
        date: 'July 2026',
        comment: 'No broker hassle. Moving in was seamless through CampusNest with zero hidden fees.'
      },
      {
        author: 'Harish R.',
        college: 'Shiv Nadar Univ',
        rating: 4.6,
        date: 'June 2026',
        comment: 'Very clean campus. The AC runs properly throughout Chennai summers.'
      }
    ],
    visualTheme: 'ruby_double',
    roomLabel: 'Twin Sharing Room with AC & Dual Study Desks',
    coverImage: '/images/ssn-omr-tech-hostel.webp',
    galleryImages: [
      '/images/ssn-omr-tech-hostel.webp',
      '/images/tambaram-greenway-hostel.webp',
      '/images/loyola-residency-hostel.webp',
      '/images/anna-tech-quarters-pg.webp'
    ],
    originCoord: [340, 220],
    landmarks: [
      {
        id: 'lm-ssn-gate',
        name: 'SSN College Kalavakkam Arch',
        type: 'campus_gate',
        x: 480,
        y: 110,
        distanceMeters: 800,
        walkingMinutes: 10,
        pathPoints: [[340, 220], [420, 220], [420, 140], [480, 110]]
      },
      {
        id: 'lm-ssn-bus',
        name: 'Kalavakkam OMR Express Stop',
        type: 'bus_stop',
        x: 260,
        y: 200,
        distanceMeters: 400,
        walkingMinutes: 5,
        pathPoints: [[340, 220], [290, 220], [260, 200]]
      }
    ]
  },
  {
    id: 'vadapalani-metro-suites',
    title: 'Vadapalani Metro Student Suites',
    type: 'PG',
    genderPreference: 'Unisex',
    roomSharing: 'Single',
    collegeNearby: 'SRM Institute of Science & Technology',
    distanceKm: 0.4,
    distanceText: '400m from SRM Vadapalani Campus',
    area: 'Vadapalani',
    city: 'Chennai',
    monthlyRent: 10500,
    deposit: 21000,
    rating: 4.8,
    reviewsCount: 41,
    isVerified: true,
    availability: 'Few Beds Left',
    facilities: ['Wi-Fi', 'AC', 'Security', 'Laundry', 'Study Desk', 'Meals', 'Elevator', 'Housekeeping'],
    safetyFeatures: ['24/7 Security guard', 'CCTV on all corridors', 'Card key access', 'Warden desk in lobby'],
    transportNearby: ['Vadapalani Metro Station (300m)', 'Vadapalani Bus Terminus (450m)', 'Nexus Vijaya Mall (500m)'],
    colleges: ['SRM Vadapalani Campus', 'SIMS Hospital Medical Institute', 'Meenakshi College'],
    description: 'Modern studio PG units right by Vadapalani Metro station and SRM City Campus. Individual single rooms with private desks, mini refrigerators, split air conditioners, and daily housekeeping.',
    studentReviews: [
      {
        author: 'Deepak V.',
        college: 'SRM Vadapalani MBA',
        rating: 5,
        date: 'September 2026',
        comment: 'Unbeatable connectivity! The metro station is literally 3 minutes on foot.'
      },
      {
        author: 'Varsha M.',
        college: 'Meenakshi College',
        rating: 4.7,
        date: 'August 2026',
        comment: 'Private room gives total concentration for exam revision. Excellent cleanliness standards.'
      },
      {
        author: 'Kunal Singhania',
        college: 'SRM Vadapalani B.Tech',
        rating: 4.8,
        date: 'July 2026',
        comment: 'Worth every rupee. Management takes care of minor issues promptly.'
      }
    ],
    visualTheme: 'studio_pg',
    roomLabel: 'Private Studio Room with Mini Fridge, TV & Study Alcove',
    coverImage: '/images/vadapalani-metro-suites-pg.webp',
    galleryImages: [
      '/images/vadapalani-metro-suites-pg.webp',
      '/images/srm-scholars-haven-pg.webp',
      '/images/stella-serenity-women-pg.webp',
      '/images/anna-tech-quarters-pg.webp'
    ],
    originCoord: [360, 210],
    landmarks: [
      {
        id: 'lm-vada-gate',
        name: 'SRM Vadapalani City Campus',
        type: 'campus_gate',
        x: 460,
        y: 110,
        distanceMeters: 400,
        walkingMinutes: 5,
        pathPoints: [[360, 210], [410, 210], [410, 140], [460, 110]]
      },
      {
        id: 'lm-vada-metro',
        name: 'Vadapalani Metro Station',
        type: 'metro',
        x: 260,
        y: 200,
        distanceMeters: 300,
        walkingMinutes: 4,
        pathPoints: [[360, 210], [300, 210], [260, 200]]
      }
    ]
  },
  {
    id: 'kotturpuram-studio-living',
    title: 'Kotturpuram Studio Student Flat',
    type: 'Flat',
    genderPreference: 'Unisex',
    roomSharing: 'Entire Flat',
    collegeNearby: 'Anna University',
    distanceKm: 0.9,
    distanceText: '900m from Anna University Kotturpuram Gate',
    area: 'Kotturpuram, Guindy Border',
    city: 'Chennai',
    monthlyRent: 18000,
    deposit: 36000,
    rating: 4.9,
    reviewsCount: 28,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'AC', 'Security', 'Laundry', 'Study Desk', 'Modular Kitchen', 'Power Backup'],
    safetyFeatures: ['Secure residential apartment', 'CCTV monitoring', 'Intercom system', 'Gated community security'],
    transportNearby: ['Kotturpuram MRTS Railway Station (500m)', 'Anna Centenary Library Bus Stop (600m)'],
    colleges: ['Anna University', 'CLRI', 'IIT Madras'],
    description: 'Bright 2BHK flat situated 3 minutes from Anna Centenary Library and Anna University campus. Fully equipped with kitchen appliances, high-speed fiber internet, and comfortable workstations.',
    studentReviews: [
      {
        author: 'Sanjay Krishnan',
        college: 'Anna Univ M.Tech',
        rating: 5,
        date: 'August 2026',
        comment: 'Being next to Anna Centenary Library is every researcher’s dream. The flat is airy and serene.'
      },
      {
        author: 'Nandita S.',
        college: 'CLRI Postgrad',
        rating: 4.9,
        date: 'July 2026',
        comment: 'High security and respectful residential society. Ideal for post-graduate students.'
      },
      {
        author: 'Aravind B.',
        college: 'Anna Univ CEG',
        rating: 4.8,
        date: 'June 2026',
        comment: 'Zero broker markup saved us ₹20,000 upfront. Smooth lease terms.'
      }
    ],
    visualTheme: 'metro_suite',
    roomLabel: 'Designer 2BHK Student Apartment with Dining & Study Zone',
    coverImage: '/images/kotturpuram-studio-flat.webp',
    galleryImages: [
      '/images/kotturpuram-studio-flat.webp',
      '/images/aura-coliving-flat.webp',
      '/images/thoraipakkam-shared-loft.webp',
      '/images/about-student-living.webp'
    ],
    originCoord: [350, 230],
    landmarks: [
      {
        id: 'lm-kott-gate',
        name: 'Anna University Kotturpuram Gate',
        type: 'campus_gate',
        x: 480,
        y: 110,
        distanceMeters: 900,
        walkingMinutes: 11,
        pathPoints: [[350, 230], [420, 230], [450, 160], [480, 110]]
      },
      {
        id: 'lm-kott-train',
        name: 'Kotturpuram MRTS Station',
        type: 'metro',
        x: 230,
        y: 280,
        distanceMeters: 500,
        walkingMinutes: 6,
        pathPoints: [[350, 230], [280, 230], [250, 260], [230, 280]]
      }
    ]
  },
  {
    id: 'thoraipakkam-shared-loft',
    title: 'Thoraipakkam Shared Student Loft',
    type: 'Shared Room',
    genderPreference: 'Boys',
    roomSharing: 'Double',
    collegeNearby: 'SSN College of Engineering',
    distanceKm: 1.5,
    distanceText: '1.5km from OMR Educational Institutions',
    area: 'Thoraipakkam, OMR',
    city: 'Chennai',
    monthlyRent: 7900,
    deposit: 15800,
    rating: 4.7,
    reviewsCount: 35,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Security', 'Laundry', 'Study Desk', 'Power Backup'],
    safetyFeatures: ['Access control doors', 'CCTV security', 'Security guard on duty', 'Emergency warden contact'],
    transportNearby: ['Thoraipakkam Bus Stop (300m)', 'Tidel Park Shuttle route', 'Local grocery market across the street'],
    colleges: ['KCG College of Technology', 'Agni College of Tech', 'NIFT', 'SSN College'],
    description: 'Urban student loft offering twin sharing accommodations on the OMR tech expressway. Great food options, gym facility within 200m, and swift bus access to engineering campuses.',
    studentReviews: [
      {
        author: 'Vasant Rajan',
        college: 'KCG College Tech',
        rating: 5,
        date: 'September 2026',
        comment: 'Very relaxed and friendly atmosphere. The meals are tasty and on-time.'
      },
      {
        author: 'Surya Narayanan',
        college: 'Agni College',
        rating: 4.6,
        date: 'August 2026',
        comment: 'Fast response from CampusNest customer support when we had a question about room keys.'
      },
      {
        author: 'Manoj Kumar',
        college: 'SSN College',
        rating: 4.6,
        date: 'July 2026',
        comment: 'Good value for money with AC and laundry included.'
      }
    ],
    visualTheme: 'garden_loft',
    roomLabel: 'Spacious Shared Room with Ergonomic Task Chairs & Wardrobes',
    coverImage: '/images/thoraipakkam-shared-loft.webp',
    galleryImages: [
      '/images/thoraipakkam-shared-loft.webp',
      '/images/egmore-heritage-shared-room.webp',
      '/images/nungambakkam-manor-coliving.webp',
      '/images/aura-coliving-flat.webp'
    ],
    originCoord: [340, 210],
    landmarks: [
      {
        id: 'lm-thor-gate',
        name: 'KCG College Campus Entrance',
        type: 'campus_gate',
        x: 460,
        y: 120,
        distanceMeters: 1500,
        walkingMinutes: 18,
        pathPoints: [[340, 210], [400, 210], [430, 160], [460, 120]]
      },
      {
        id: 'lm-thor-bus',
        name: 'Thoraipakkam OMR Bus Stand',
        type: 'bus_stop',
        x: 270,
        y: 200,
        distanceMeters: 300,
        walkingMinutes: 4,
        pathPoints: [[340, 210], [300, 210], [270, 200]]
      }
    ]
  },
  {
    id: 'nungambakkam-manor-coliving',
    title: 'Nungambakkam Manor Co-living',
    type: 'PG',
    genderPreference: 'Unisex',
    roomSharing: 'Single',
    collegeNearby: 'Loyola College',
    distanceKm: 0.6,
    distanceText: '600m from Loyola College and MOP Vaishnav',
    area: 'College Road, Nungambakkam',
    city: 'Chennai',
    monthlyRent: 12500,
    deposit: 25000,
    rating: 4.9,
    reviewsCount: 49,
    isVerified: true,
    availability: 'Available Now',
    facilities: ['Wi-Fi', 'Meals', 'AC', 'Security', 'Laundry', 'Study Desk', 'Housekeeping', 'Power Backup'],
    safetyFeatures: ['Biometric entry', '24/7 Security guard', 'Female warden available', 'CCTV on all floors'],
    transportNearby: ['Nungambakkam Station (700m)', 'College Road Bus Stop (120m)', 'Sterling Road junction (500m)'],
    colleges: ['Loyola College', 'MOP Vaishnav College', 'Women’s Christian College', 'Stella Maris College'],
    description: 'Upscale student PG located along leafy College Road in Nungambakkam. Offers private single rooms with attached washrooms, custom desks, delicious 3 meals a day, and laundry service.',
    studentReviews: [
      {
        author: 'Kavya Sridharan',
        college: 'MOP Vaishnav Media Studies',
        rating: 5,
        date: 'September 2026',
        comment: 'Living here makes college life so comfortable! Safe neighbourhood and very respectful peer group.'
      },
      {
        author: 'Pranav Menon',
        college: 'Loyola Visual Communication',
        rating: 5,
        date: 'August 2026',
        comment: 'The location is central to everything. Walking to Loyola takes just six minutes.'
      },
      {
        author: 'Swathi R.',
        college: 'WCC Chennai',
        rating: 4.8,
        date: 'July 2026',
        comment: 'Delicious home-style meals with genuine South Indian curries. Very clean and hygienic.'
      }
    ],
    visualTheme: 'executive_triple',
    roomLabel: 'Single Deluxe Suite with Private Balcony & Teak Workstation',
    coverImage: '/images/nungambakkam-manor-coliving.webp',
    galleryImages: [
      '/images/nungambakkam-manor-coliving.webp',
      '/images/egmore-heritage-shared-room.webp',
      '/images/thoraipakkam-shared-loft.webp',
      '/images/kotturpuram-studio-flat.webp'
    ],
    originCoord: [350, 210],
    landmarks: [
      {
        id: 'lm-manor-gate',
        name: 'Loyola College Road Gate',
        type: 'campus_gate',
        x: 480,
        y: 110,
        distanceMeters: 600,
        walkingMinutes: 7,
        pathPoints: [[350, 210], [420, 210], [440, 150], [480, 110]]
      },
      {
        id: 'lm-manor-mop',
        name: 'MOP Vaishnav College Campus',
        type: 'campus_gate',
        x: 230,
        y: 140,
        distanceMeters: 550,
        walkingMinutes: 7,
        pathPoints: [[350, 210], [290, 210], [260, 160], [230, 140]]
      },
      {
        id: 'lm-manor-bus',
        name: 'College Road Bus Stop',
        type: 'bus_stop',
        x: 350,
        y: 290,
        distanceMeters: 120,
        walkingMinutes: 2,
        pathPoints: [[350, 210], [350, 290]]
      }
    ]
  }
];

export const CHENNAI_COLLEGES = [
  'SRM Institute of Science & Technology',
  'Loyola College',
  'Anna University (CEG / ACTech)',
  'IIT Madras',
  'Madras Christian College (MCC)',
  'Stella Maris College',
  'Ethiraj College for Women',
  'SSN College of Engineering',
  'MOP Vaishnav College',
  'Women’s Christian College'
];
