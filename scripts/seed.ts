const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
                { name: "Business" },
                { name: "Reading" },
                { name: "Geography" },
                { name: "History" },
                { name: "Marketing" },
                { name: "Economics" },
                { name: "Science" },
                { name: "Drawing" },
                { name: "Painting" },
                { name: "Psychology" },
                { name: "Languages" },
            ],
            skipDuplicates: true 
        });

        console.log("Categories seeded successfully");
    } catch (error) {
        console.error("Error seeding the database categories:", error);
    } finally {
        await database.$disconnect();
    }
}

main();
