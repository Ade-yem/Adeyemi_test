import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Cars',
    description: 'Luxury and standard car brands',
    brands: [
      'Toyota',
      'Honda',
      'BMW',
      'Mercedes-Benz',
      'Audi',
      'Ford',
      'Chevrolet',
      'Hyundai',
      'Kia',
      'Nissan'
    ]
  },
  {
    name: 'Trucks',
    description: 'Commercial and heavy-duty truck brands',
    brands: [
      'Freightliner',
      'Peterbilt',
      'Kenworth',
      'Volvo Trucks',
      'Mack Trucks',
      'International',
      'Western Star',
      'Isuzu',
      'Hino',
      'Scania'
    ]
  },
  {
    name: 'Bikes',
    description: 'Motorcycle and scooter brands',
    brands: [
      'Harley-Davidson',
      'Honda Motorcycles',
      'Yamaha',
      'Kawasaki',
      'Suzuki',
      'Ducati',
      'BMW Motorrad',
      'Triumph',
      'Indian Motorcycle',
      'Royal Enfield'
    ]
  },
  {
    name: 'Tricycles',
    description: 'Three-wheeled vehicle brands',
    brands: [
      'Piaggio',
      'Bajaj Auto',
      'TVS Motor',
      'Mahindra',
      'Atul Auto',
      'Lohia Auto',
      'Scooters India',
      'Qingqi',
      'Jinpeng',
      'Tuk Tuk'
    ]
  },
  {
    name: 'Bicycles',
    description: 'Traditional and electric bicycle brands',
    brands: [
      'Trek',
      'Specialized',
      'Giant',
      'Cannondale',
      'Santa Cruz',
      'Scott',
      'Bianchi',
      'Raleigh',
      'Schwinn',
      'Electra'
    ]
  }
];

export async function seedCategories() {
  try {
    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        }
      });
    }
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}