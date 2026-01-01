
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Bus Listings...');

    // Date: 01 January 2025
    const seedDate = new Date('2025-01-01T12:00:00Z');

    const buses = [
        {
            bus_code: 'SHJ-MWA-001',
            pickup_point: 'Sharjah Mwasalat',
            dropoff_location: 'Oman',
            departure_time: '07:00 AM', // Estimated
            expected_arrival_time: '12:00 PM', // Estimated
            expected_return_time: '05:00 PM', // Estimated
            base_price: 260,
            oman_visa_included: false,
            uae_visa_included: false,
            exit_fee_included: false, // "WITHOUT OMAN VISA"
            marketing_badge: 'Available',
            internal_notes: 'SHARJAH MWASALAT BUS WITHOUT OMAN VISA - WITH RETURN',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'SHJ-MWA-002',
            pickup_point: 'Sharjah Mwasalat',
            dropoff_location: 'Oman',
            departure_time: '07:30 AM', // Estimated
            expected_arrival_time: '12:30 PM', // Estimated
            expected_return_time: '05:30 PM', // Estimated
            base_price: 320,
            oman_visa_included: true, // "WITH OMAN VISA"
            uae_visa_included: false,
            exit_fee_included: false,
            marketing_badge: 'SOLD OUT',
            internal_notes: 'SHARJAH MWASALATH BUS WITH OMAN VISA - WITH RETURN',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'AK-B2B-001',
            pickup_point: 'Al Khanjary Station',
            dropoff_location: 'Oman',
            departure_time: '08:00 AM', // Estimated
            expected_arrival_time: '01:00 PM', // Estimated
            expected_return_time: '06:00 PM', // Estimated
            base_price: 240,
            oman_visa_included: false, // "(NO OMAN VISA)"
            uae_visa_included: false,
            exit_fee_included: false,
            marketing_badge: 'SELLING OUT',
            internal_notes: 'AL KHANJARY B2B PACKAGE (NO OMAN VISA) - WITH RETURN',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'AK-RET-001',
            pickup_point: 'Al Khanjary Station',
            dropoff_location: 'Oman',
            departure_time: '09:00 AM', // Estimated
            expected_arrival_time: '02:00 PM', // Estimated
            expected_return_time: '07:00 PM', // Estimated
            base_price: 120,
            oman_visa_included: false,
            uae_visa_included: false,
            exit_fee_included: false,
            marketing_badge: 'SELLING OUT',
            internal_notes: 'AL KHANJARY PACKAGE RETURN ONLY',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'AK-PVT-001',
            pickup_point: 'Al Khanjary (Private)',
            dropoff_location: 'Oman',
            departure_time: '10:00 AM', // Estimated
            expected_arrival_time: '03:00 PM', // Estimated
            expected_return_time: '08:00 PM', // Estimated
            base_price: 320,
            oman_visa_included: true, // "Details: WITH OMAN VISA"
            uae_visa_included: false,
            exit_fee_included: true, // "( NO EXIT FEE)" -> Assuming included
            marketing_badge: 'SELLING OUT',
            internal_notes: 'AL KHANJARY PACKAGE WITH PVT BUS RETURN ( NO EXIT FEE)',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'AK-PVT-002',
            pickup_point: 'Al Khanjary (Private)',
            dropoff_location: 'Oman',
            departure_time: '11:00 AM', // Estimated
            expected_arrival_time: '04:00 PM', // Estimated
            expected_return_time: '09:00 PM', // Estimated
            base_price: 270,
            oman_visa_included: false, // "(NO OMAN VISA)"
            uae_visa_included: false,
            exit_fee_included: true, // "& EXIT" -> Assuming No Exit Fee again based on context? Or No Exit included? "NO OMAN VISA & EXIT" likely means NO (OMAN VISA & EXIT). So Exit fee NOT included/Exempt.
            marketing_badge: 'SELLING OUT',
            internal_notes: 'AL KHANJARY PACKAGE WITH PVT RETURN (NO OMAN VISA & EXIT)',
            food_included: false,
            accommodation_included: false,
        },
        {
            bus_code: 'AK-RET-DXB',
            pickup_point: 'Al Khanjary Station',
            dropoff_location: 'Oman',
            departure_time: '12:00 PM', // Estimated
            expected_arrival_time: '05:00 PM', // Estimated
            expected_return_time: '10:00 PM', // Estimated
            base_price: 275,
            oman_visa_included: true, // "WITH OMAN VISA"
            uae_visa_included: false, // "RETURN DUBAI VISA" might imply it? But title says "RETURN DUBAI VISA". The line says "Details: WITH OMAN VISA WITH RETURN". Maybe "RETURN DUBAI VISA" is the package name.
            exit_fee_included: false,
            marketing_badge: 'SELLING OUT',
            internal_notes: 'AL KHANJRY PACKAGE ( RETURN DUBAI VISA)',
            food_included: true, // "With Food"
            accommodation_included: true, // "With Accomodation"
        },
    ];

    for (const bus of buses) {
        // Create or Update
        const listing = await prisma.busListing.upsert({
            where: { bus_code: bus.bus_code },
            update: bus,
            create: bus,
        });

        // Add Date
        const exists = await prisma.busDate.findFirst({
            where: {
                busId: listing.id,
                date: seedDate
            }
        });

        if (!exists) {
            await prisma.busDate.create({
                data: {
                    busId: listing.id,
                    date: seedDate
                }
            });
            console.log(`Added date for ${bus.bus_code}`);
        }
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
