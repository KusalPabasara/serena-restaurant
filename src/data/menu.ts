export type MenuCategory = 'Starters' | 'Garden' | 'Sea' | 'Land' | 'Desserts'

export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-free' | 'Dairy-free'

export interface Dish {
  id: string
  name: string
  category: MenuCategory
  description: string
  provenance: string
  price: number
  image: string
  tags: DietaryTag[]
  featured?: boolean
}

export const CATEGORIES: MenuCategory[] = [
  'Starters',
  'Garden',
  'Sea',
  'Land',
  'Desserts',
]

export const menu: Dish[] = [
  {
    id: 'gotukola-salad',
    name: 'Gotukola & Green Mango',
    category: 'Starters',
    description:
      'Crisp green mango, toasted coconut, and fragrant gotukola dressed in lime leaf oil.',
    provenance: 'Homegarden greens · Western Province',
    price: 3200,
    image: '/images/dish-salad.webp',
    tags: ['Vegetarian', 'Gluten-free'],
    featured: true,
  },
  {
    id: 'tomato-consomme',
    name: 'Dambulla Tomato Consommé',
    category: 'Starters',
    description:
      'Clarified heirloom tomato broth with basil oil and a grilled sourdough crisp.',
    provenance: 'Dambulla market gardens',
    price: 2800,
    image: '/images/dish-consomme.webp',
    tags: ['Vegetarian'],
  },
  {
    id: 'jackfruit-carpaccio',
    name: 'Young Jackfruit Carpaccio',
    category: 'Garden',
    description:
      'Paper-thin jackfruit with gotukola oil, microgreens, and edible island flowers.',
    provenance: 'Kurunegala orchards',
    price: 3600,
    image: '/images/dish-jackfruit.webp',
    tags: ['Vegan', 'Gluten-free'],
    featured: true,
  },
  {
    id: 'charred-eggplant',
    name: 'Charred Eggplant & Pol Sambol',
    category: 'Garden',
    description:
      'Wood-fired eggplant with light pol sambol foam and roasted peanut crunch.',
    provenance: 'Nuwara Eliya highland plots',
    price: 3400,
    image: '/images/dish-eggplant.webp',
    tags: ['Vegetarian', 'Gluten-free'],
  },
  {
    id: 'lagoon-prawns',
    name: 'Lagoon Prawns, Coconut Foam',
    category: 'Sea',
    description:
      'Sweet lagoon prawns finished with coconut foam and curry leaf oil.',
    provenance: 'Same-day coastal catch',
    price: 7200,
    image: '/images/dish-prawn.webp',
    tags: ['Dairy-free', 'Gluten-free'],
    featured: true,
  },
  {
    id: 'line-caught-fish',
    name: 'Line-Caught Fish, Hill Greens',
    category: 'Sea',
    description:
      'Gently seared catch of the day with turmeric emulsion and hill-country greens.',
    provenance: 'Negombo dawn landings',
    price: 6800,
    image: '/images/dish-fish.webp',
    tags: ['Gluten-free'],
    featured: true,
  },
  {
    id: 'cinnamon-lamb',
    name: 'Cinnamon-Braised Lamb',
    category: 'Land',
    description:
      'Slow-braised lamb with roasted roots and a whisper of Ceylon cinnamon.',
    provenance: 'Uva Province pasture',
    price: 7800,
    image: '/images/dish-lamb.webp',
    tags: ['Gluten-free'],
  },
  {
    id: 'coconut-pannacotta',
    name: 'Coconut Pannacotta',
    category: 'Desserts',
    description:
      'Silken coconut cream set with cinnamon caramel and tropical fruit.',
    provenance: 'Southern coconut estates',
    price: 2600,
    image: '/images/dish-coconut.webp',
    tags: ['Vegetarian', 'Gluten-free'],
  },
  {
    id: 'jaggery-tart',
    name: 'Jaggery & Cinnamon Tart',
    category: 'Desserts',
    description:
      'Warm jaggery tart with buffalo curd ice cream and toasted spice.',
    provenance: 'Kandy spice gardens',
    price: 2900,
    image: '/images/dish-tart.webp',
    tags: ['Vegetarian'],
  },
]

export const restaurant = {
  name: 'Serenā',
  tagline: 'Farm to table, plate to calm.',
  philosophy:
    'Contemporary Sri Lankan fine dining rooted in island seasons, open-kitchen care, and unhurried hospitality.',
  address: '42 Horton Place, Cinnamon Gardens, Colombo 07',
  phone: '+94 11 234 5678',
  email: 'reservations@serena.lk',
  dressCode: 'Smart elegant — jackets optional, flip-flops kindly left at home.',
  hours: [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday – Thursday', time: 'Dinner 6:30 – 10:30 pm' },
    { day: 'Friday – Sunday', time: 'Lunch 12:00 – 2:30 pm · Dinner 6:30 – 10:30 pm' },
  ],
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=79.855%2C6.905%2C79.875%2C6.920&layer=mapnik&marker=6.9125%2C79.865',
  arrival:
    'A short walk from the National Museum. Valet available on Horton Place from 6 pm. Ride-hailing drop-off at the garden gate.',
}

export function formatLkr(price: number): string {
  return `LKR ${price.toLocaleString('en-LK')}`
}
