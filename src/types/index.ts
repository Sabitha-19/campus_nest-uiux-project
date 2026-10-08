export type AccommodationType = 'PG' | 'Hostel' | 'Shared Room' | 'Flat';
export type GenderPreference = 'Boys' | 'Girls' | 'Unisex';
export type SharingType = 'Single' | 'Double' | 'Triple' | '4-Sharing' | 'Entire Flat';

export interface Landmark {
  id: string;
  name: string;
  type: 'campus_gate' | 'library' | 'canteen' | 'bus_stop' | 'metro' | 'pharmacy' | 'market';
  x: number;
  y: number;
  distanceMeters: number;
  walkingMinutes: number;
  pathPoints: [number, number][];
}

export interface StudentReview {
  author: string;
  college: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Accommodation {
  id: string;
  title: string;
  type: AccommodationType;
  genderPreference: GenderPreference;
  roomSharing: SharingType;
  collegeNearby: string;
  distanceKm: number;
  distanceText: string;
  area: string;
  city: string;
  monthlyRent: number;
  deposit: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  availability: 'Available Now' | 'From Next Month' | 'Few Beds Left';
  facilities: string[];
  safetyFeatures: string[];
  transportNearby: string[];
  colleges: string[];
  description: string;
  studentReviews: StudentReview[];
  visualTheme: 'study_haven' | 'balcony_twin' | 'sunset_room' | 'classic_quarters' | 'studio_pg' | 'oak_minimalist' | 'ruby_double' | 'community_lounge' | 'executive_triple' | 'metro_suite' | 'greenway_dorm' | 'garden_loft';
  roomLabel: string;
  coverImage?: string;
  galleryImages?: string[];
  landmarks: Landmark[];
  originCoord: [number, number];
}

export interface RoommateProfile {
  id: string;
  name: string;
  initials: string;
  gender: 'Female' | 'Male' | 'Any';
  college: string;
  location: string;
  budget: number;
  roomType: AccommodationType;
  lifestyleTags: string[];
  compatibility: number;
  bio: string;
  moveInDate: string;
}

export interface EnquirySubmission {
  propertyId: string;
  propertyTitle: string;
  propertyArea: string;
  monthlyRent: number;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  college: string;
  moveInDate: string;
  preferredRoomType: string;
  message?: string;
  submittedAt: string;
}

export interface FilterState {
  searchQuery: string;
  budgetMax: number;
  distanceMax: number;
  type: string;
  gender: string;
  facilities: string[];
  sortBy: 'price-asc' | 'price-desc' | 'distance' | 'rating';
}
