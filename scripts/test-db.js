
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Testing DB Connection...');
    try {
        const users = await prisma.user.findMany();
        console.log('Connection Successful!');
        console.log('User Count:', users.length);
        if (users.length > 0) {
            console.log('Sample User:', users[0].email);
        }
    } catch (e) {
        console.error('Connection Failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
