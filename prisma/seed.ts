import { seedCategories } from "./seed/categories";
import { seedBicycles } from "./seed/bicycle";
import { seedCars } from "./seed/car";
import { seedTrucks } from "./seed/truck";

const seed = async () => {
    console.log("Seeding categories...");
    await seedCategories();
    console.log("Seeding bicycles...");
    await seedBicycles();
    console.log("Seeding cars...");
    await seedCars();
    console.log("Seeding trucks...");
    await seedTrucks();
    console.log("Seeding completed");
}

seed();