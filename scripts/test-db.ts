
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing DB Connection...');
    try {
        const buses = await prisma.busListing.findMany({
            take: 1,
            include: { available_dates: true }
        });
        console.log('Successfully fetched buses:', JSON.stringify(buses, null, 2));
        if (buses.length > 0) {
            console.log('First bus keys:', Object.keys(buses[0]));
            console.log('bus_class value:', buses[0].bus_class);
        } else {
            console.log('No buses found.');
        }
    } catch (e) {
        console.error('DB Test FAILED:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
