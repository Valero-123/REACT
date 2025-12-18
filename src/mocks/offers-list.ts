import { OffersList } from "../types/offer";

const offersList: OffersList[] = [
  
  {
    id: 'apt-002',
    title: 'Bright Canal Loft',
    type: 'room',
    price: 215,
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.3702, longitude: 4.8952, zoom: 18 }
    },
    location: { latitude: 52.3695, longitude: 4.8974, zoom: 18 },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/apartment-02.jpg'
  },

  {
    id: 'apt-003',
    title: 'Cozy Old Town Studio',
    type: 'studio',
    price: 150,
    city: {
      name: 'Brussels',
      location: { latitude: 50.8503, longitude: 4.3517, zoom: 18 }
    },
    location: { latitude: 50.8498, longitude: 4.3542, zoom: 18 },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/apartment-03.jpg'
  },

  {
    id: 'apt-004',
    title: 'Harbor View Apartment',
    type: 'apartment',
    price: 290,
    city: {
      name: 'Hamburg',
      location: { latitude: 53.5511, longitude: 9.9937, zoom: 18 }
    },
    location: { latitude: 53.5522, longitude: 9.9954, zoom: 18 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-01.jpg'
  }
  ,
  {
    id: 'apt-005',
    title: 'Sunny Central Flat',
    type: 'apartment',
    price: 120,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8570, longitude: 2.3530, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/mocks/5_1.jpg'
  },

  {
    id: 'apt-008',
    title: 'Modern Loft',
    type: 'apartment',
    price: 180,
    city: { name: 'Amsterdam', location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 } },
    location: { latitude: 52.3690, longitude: 4.8960, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/mocks/8_1.jpg'
  },

  {
    id: 'apt-010',
    title: 'Designer Flat',
    type: 'apartment',
    price: 220,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8555, longitude: 2.3500, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/mocks/10_1.jpg'
  },
  {
    id: 'apt-011',
    title: 'Compact City Studio',
    type: 'studio',
    price: 85,
    city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 12 } },
    location: { latitude: 50.9365, longitude: 6.9610, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/mocks/11_1.jpg'
  },
  {
    id: 'apt-012',
    title: 'Bright Attic',
    type: 'room',
    price: 65,
    city: { name: 'Brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 } },
    location: { latitude: 50.8510, longitude: 4.3530, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/mocks/12_1.jpg'
  },
  {
    id: 'apt-013',
    title: 'Riverside Apartment',
    type: 'apartment',
    price: 160,
    city: { name: 'Amsterdam', location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 } },
    location: { latitude: 52.3705, longitude: 4.8940, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: '/img/mocks/13_1.jpg'
  },

  {
    id: 'apt-015',
    title: 'Loft with Terrace',
    type: 'apartment',
    price: 210,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8575, longitude: 2.3490, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/mocks/15_1.jpg'
  },
  {
    id: 'apt-016',
    title: 'Minimal Studio',
    type: 'studio',
    price: 70,
    city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 12 } },
    location: { latitude: 50.9380, longitude: 6.9620, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    previewImage: '/img/mocks/16_1.jpg'
  },
  {
    id: 'apt-017',
    title: 'Garden View Flat',
    type: 'apartment',
    price: 130,
    city: { name: 'Brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 } },
    location: { latitude: 50.8490, longitude: 4.3500, zoom: 15 },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/mocks/17_1.jpg'
  },
  {
    id: 'apt-018',
    title: 'Industrial Chic',
    type: 'apartment',
    price: 195,
    city: { name: 'Amsterdam', location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 } },
    location: { latitude: 52.3710, longitude: 4.8955, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.6,
    previewImage: '/img/mocks/18_1.jpg'
  },
  {
    id: 'apt-019',
    title: 'Seaside Retreat',
    type: 'apartment',
    price: 170,
    city: { name: 'Hamburg', location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 } },
    location: { latitude: 53.5540, longitude: 9.9960, zoom: 15 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: '/img/mocks/19_1.jpg'
  },
  {
    id: 'apt-020',
    title: 'City Centre Duplex',
    type: 'apartment',
    price: 240,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8565, longitude: 2.3525, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/mocks/20_1.jpg'
  },
  {
    id: 'apt-021',
    title: 'Economy Room',
    type: 'room',
    price: 55,
    city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 12 } },
    location: { latitude: 50.9372, longitude: 6.9595, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 3.9,
    previewImage: '/img/mocks/21_1.jpg'
  },
  {
    id: 'apt-022',
    title: 'Countryside Apartment',
    type: 'apartment',
    price: 135,
    city: { name: 'Brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 } },
    location: { latitude: 50.8480, longitude: 4.3490, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
    previewImage: '/img/mocks/22_1.jpg'
  },
  {
    id: 'apt-023',
    title: 'Designer One-Bed',
    type: 'apartment',
    price: 185,
    city: { name: 'Amsterdam', location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 } },
    location: { latitude: 52.3698, longitude: 4.8945, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.7,
    previewImage: '/img/mocks/23_1.jpg'
  },
  {
    id: 'apt-024',
    title: 'Family Flat',
    type: 'apartment',
    price: 155,
    city: { name: 'Hamburg', location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 } },
    location: { latitude: 53.5515, longitude: 9.9945, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
    previewImage: '/img/mocks/24_1.jpg'
  },
  {
    id: 'apt-025',
    title: 'Penthouse Suite',
    type: 'apartment',
    price: 320,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8580, longitude: 2.3540, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    previewImage: '/img/mocks/25_1.jpg'
  },
  {
    id: 'apt-026',
    title: 'Budget Studio',
    type: 'studio',
    price: 60,
    city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 12 } },
    location: { latitude: 50.9355, longitude: 6.9570, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 3.8,
    previewImage: '/img/mocks/26_1.jpg'
  },
  {
    id: 'apt-027',
    title: 'Bright Terrace Room',
    type: 'room',
    price: 90,
    city: { name: 'Brussels', location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 } },
    location: { latitude: 50.8520, longitude: 4.3550, zoom: 15 },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
    previewImage: '/img/mocks/27_1.jpg'
  },
  {
    id: 'apt-028',
    title: 'Compact Designer Room',
    type: 'room',
    price: 110,
    city: { name: 'Amsterdam', location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 } },
    location: { latitude: 52.3715, longitude: 4.8965, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: '/img/mocks/28_1.jpg'
  },
  {
    id: 'apt-029',
    title: 'Harbor Studio',
    type: 'studio',
    price: 125,
    city: { name: 'Hamburg', location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 } },
    location: { latitude: 53.5525, longitude: 9.9970, zoom: 15 },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: '/img/mocks/29_1.jpg'
  },
  {
    id: 'apt-030',
    title: 'Skyline View Apartment',
    type: 'apartment',
    price: 275,
    city: { name: 'Paris', location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 } },
    location: { latitude: 48.8578, longitude: 2.3550, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/mocks/30_1.jpg'
  },
{
    id: 'apt-031',
    title: 'Modern Riverside Loft',
    type: 'apartment',
    price: 220,
    city: { name: 'Dusseldorf', location: { latitude: 51.2254, longitude: 6.7763, zoom: 13 } },
    location: { latitude: 51.2260, longitude: 6.7770, zoom: 16 },
    isPremium: true,
    isFavorite: false,
    rating: 4.9,
    previewImage: '/img/mocks/31_1.jpg'
},
{
    id: 'apt-032',
    title: 'Altstadt Studio',
    type: 'apartment',
    price: 120,
    city: { name: 'Dusseldorf', location: { latitude: 51.2254, longitude: 6.7763, zoom: 13 } },
    location: { latitude: 51.2270, longitude: 6.7750, zoom: 16 },
    isPremium: false,
    isFavorite: true,
    rating: 4.3,
    previewImage: '/img/mocks/32_1.jpg'
},
{
    id: 'apt-033',
    title: 'MedienHafen Penthouse',
    type: 'apartment',
    price: 350,
    city: { name: 'Dusseldorf', location: { latitude: 51.2254, longitude: 6.7763, zoom: 13 } },
    location: { latitude: 51.2145, longitude: 6.7642, zoom: 16 },
    isPremium: true,
    isFavorite: false,
    rating: 5.0,
    previewImage: '/img/mocks/33_1.jpg'
},
{
    id: 'apt-034',
    title: 'Königsallee Luxury Suite',
    type: 'hotel',
    price: 280,
    city: { name: 'Dusseldorf', location: { latitude: 51.2254, longitude: 6.7763, zoom: 13 } },
    location: { latitude: 51.2240, longitude: 6.7785, zoom: 16 },
    isPremium: true,
    isFavorite: true,
    rating: 4.7,
    previewImage: '/img/mocks/34_1.jpg'
}
];

export { offersList };
