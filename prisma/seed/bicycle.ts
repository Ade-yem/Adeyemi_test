import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bicycles = [
  {
    name: 'Trek Domane SL5',
    sku: 'TREK-DOM-001',
    price: 2499.99,
    quantity: 8,
    reorderLevel: 3,
    description: 'Endurance road bike with carbon frame and disc brakes',
    imageUrl: 'https://c02.purpledshub.com/uploads/sites/39/2019/03/1399044565563-17ak1dw6cpuhw-3d19c29.jpg'
  },
  {
    name: 'Specialized Turbo Vado 4.0',
    sku: 'SPEC-TURB-001',
    price: 3999.99,
    quantity: 5,
    reorderLevel: 2,
    description: 'Electric commuter bike with integrated battery',
    imageUrl: 'https://c02.purpledshub.com/uploads/sites/39/2020/05/93920-30_VADO-SL-50-BRSH-BLKREFL_HERO-a9ee16e-scaled.jpg'
  },
  {
    name: 'Giant Defy Advanced 2',
    sku: 'GIANT-DEF-001',
    price: 2299.99,
    quantity: 6,
    reorderLevel: 2,
    description: 'Carbon road bike with endurance geometry',
    imageUrl: 'https://c02.purpledshub.com/uploads/sites/39/2019/03/1362072394082-7x808k01li17-0033c24.jpg'
  },
  {
    name: 'Cannondale Topstone 1',
    sku: 'CANN-TOP-001',
    price: 1999.99,
    quantity: 4,
    reorderLevel: 2,
    description: 'Gravel bike with carbon frame and 1x drivetrain',
    imageUrl: 'https://c02.purpledshub.com/uploads/sites/39/2021/03/Cannondale-Topstone-Neo-SL-news-01-c474809.jpg'
  },
  {
    name: 'Santa Cruz Chameleon',
    sku: 'SC-CHAM-001',
    price: 2799.99,
    quantity: 3,
    reorderLevel: 1,
    description: 'Versatile mountain bike with aluminum frame',
    imageUrl: 'https://c02.purpledshub.com/uploads/sites/39/2021/10/Santa-Cruz-Chameleon-S-29-67e5e74.jpg'
  }
];

export async function seedBicycles() {
  try {
    const category = await prisma.category.findFirst({
      where: { name: 'Bicycles' }
    });

    if (!category) {
      throw new Error('Bicycles category not found');
    }

    for (const bicycle of bicycles) {
      await prisma.inventoryItem.create({
        data: {
          ...bicycle,
          categoryId: category.id
        }
      });
    }
    console.log('Bicycles seeded successfully');
  } catch (error) {
    console.error('Error seeding bicycles:', error);
  } finally {
    await prisma.$disconnect();
  }
}
