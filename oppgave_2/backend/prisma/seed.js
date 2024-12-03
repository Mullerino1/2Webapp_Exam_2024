import { PrismaClient } from '@prisma/client'
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
const prisma = new PrismaClient()
async function main() {
  const events = await prisma.events.createMany({
    data: [{
        id: 1,
        title: "Rammstein Concert",
        description: "A rammstein concert",
        slug: "Rammstein Concert",
        date: JSON.stringify({day: 10, month: 10, year: 2024}),
        location: "Oslo",
        type: "Concert",
        seats: 69,
        price: '666',
        waiting_list: true,
        full: true
        },
        {
        id: 2,
        title: "Marathon",
        description: "The longest run ever",
        slug: "Marathon",
        date: JSON.stringify({day: 14, month: 2, year: 2025}),
        location: "Fredrikstad",
        type: "Marathon",
        seats: 1000,
        price: `500`,
        waiting_list: false,
        full: false
        },
        {
        id: 3,
        title: "Christmas Market",
        description: "A cozy Christmas Market",
        slug: "Christmas Market",
        date: JSON.stringify({day: 20, month: 12, year: 2024}),
        location: "Bærum",
        type: "Social Event",
        seats: 1000,
        price: '0',
        waiting_list: false,
        full: false
        }
        ]
    })
    
    const customers = await prisma.customers.createMany({
        data: [{
            id: 1,
            name: "Martine!",
            phonenumber: "12345678",
            email: "Martine@hiof.no",
            approved: "Approved",
            people: 2
        },
        {
            id: 2,
            name: "Kim!",
            phonenumber: "12345678",
            email: "Kim@hiof.no",
            approved: "Denied",
            people: 5
        }
    
            ]
        })

    }
    main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })