import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const trucks = [
  {
    name: 'Freightliner Cascadia',
    sku: 'FRE-CAS-001',
    price: 145000.00,
    quantity: 2,
    reorderLevel: 1,
    description: 'Class 8 heavy-duty truck with advanced aerodynamics',
    imageUrl: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/2019/02/ccj.cascadia-2019-02-18-07-15.png?auto=format%2Ccompress&fit=max&q=70&w=400'
  },
  {
    name: 'Peterbilt 579',
    sku: 'PET-579-001',
    price: 155000.00,
    quantity: 2,
    reorderLevel: 1,
    description: 'Long-haul truck with fuel-efficient design',
    imageUrl: 'https://www.peterbilt.com/static-assets/images/truck/579%20and%20Day%20Cab%20Trucks.png'
  },
  {
    name: 'Kenworth T680',
    sku: 'KEN-T680-001',
    price: 150000.00,
    quantity: 3,
    reorderLevel: 1,
    description: 'Aerodynamic truck with advanced driver assistance',
    imageUrl: 'https://example.com/kenworth-t680.jpg'
  },
  {
    name: 'Volvo FH16',
    sku: 'VOL-FH16-001',
    price: 160000.00,
    quantity: 2,
    reorderLevel: 1,
    description: 'Heavy-duty truck with 750hp engine',
    imageUrl: 'https://example.com/volvo-fh16.jpg'
  },
  {
    name: 'Mack Anthem',
    sku: 'MAC-ANT-001',
    price: 140000.00,
    quantity: 3,
    reorderLevel: 1,
    description: 'Highway truck with MP8 engine',
    imageUrl: 'https://example.com/mack-anthem.jpg'
  }
];

export async function seedTrucks() {
  try {
    const category = await prisma.category.findFirst({
      where: { name: 'Trucks' }
    });

    if (!category) {
      throw new Error('Trucks category not found');
    }

    for (const truck of trucks) {
      await prisma.inventoryItem.create({
        data: {
          ...truck,
          categoryId: category.id
        }
      });
    }
    console.log('Trucks seeded successfully');
  } catch (error) {
    console.error('Error seeding trucks:', error);
  } finally {
    await prisma.$disconnect();
  }
}
