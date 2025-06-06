import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cars = [
  {
    name: 'Toyota Camry 2021',
    sku: 'TCAM-2021-001',
    price: 25000.00,
    quantity: 5,
    reorderLevel: 2,
    description: 'Mid-size sedan with excellent fuel efficiency and reliability',
    imageUrl: 'https://www.netcarshow.com/R/Toyota-Camry-2021-thb.jpg'
  },
  {
    name: 'BMW 3 Series Touring 2023',
    sku: 'BMW3-2023-001',
    price: 45000.00,
    quantity: 3,
    reorderLevel: 1,
    description: 'Luxury sports sedan with premium features',
    imageUrl: 'https://www.netcarshow.com/R/BMW-3-Series_Touring-2023-thb.jpg'
  },
  {
    name: 'Honda Civic Type R 2023',
    sku: 'HCIV-2023-001',
    price: 22000.00,
    quantity: 7,
    reorderLevel: 3,
    description: 'Compact car known for reliability and fuel efficiency',
    imageUrl: 'https://www.netcarshow.com/R/Honda-Civic_Type_R-2023-thb.jpg'
  },
  {
    name: 'Mercedes-Benz C-Class 2022',
    sku: 'MBC-2022-001',
    price: 48000.00,
    quantity: 2,
    reorderLevel: 1,
    description: 'Luxury compact executive car with advanced technology',
    imageUrl: 'https://www.netcarshow.com/R/Mercedes-Benz-C-Class-2022-thb.jpg'
  },
  {
    name: 'Audi A4 Avant S Line Competition Plus 2022',
    sku: 'AUDI4-2022-001',
    price: 42000.00,
    quantity: 4,
    reorderLevel: 2,
    description: 'Premium compact executive car with quattro all-wheel drive',
    imageUrl: 'https://www.netcarshow.com/R/Audi-A4_Avant_S_line_competition_plus-2022-thb.jpg'
  }
];

export async function seedCars() {
  try {
    const category = await prisma.category.findFirst({
      where: { name: 'Cars' }
    });

    if (!category) {
      throw new Error('Cars category not found');
    }

    for (const car of cars) {
      await prisma.inventoryItem.create({
        data: {
          ...car,
          categoryId: category.id
        }
      });
    }
    console.log('Cars seeded successfully');
  } catch (error) {
    console.error('Error seeding cars:', error);
  } finally {
    await prisma.$disconnect();
  }
}