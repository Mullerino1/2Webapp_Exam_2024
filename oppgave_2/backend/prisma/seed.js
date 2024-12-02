import { PrismaClient } from '@prisma/client'
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
const prisma = new PrismaClient()
async function main() {
  const events = await prisma.courses.createMany({
    data: [{
        id: 1,
        title: "Rammstein Concert",
        description: "A rammstein concert",
        slug: "Rammstein Concert",
        date: {day: 10, month: 10, year: 2024},
        location: "Oslo",
        type: "Concert",
        seats: 69,
        waiting_list: true
        },
        {
        id: 2,
        title: "Marathon",
        description: "The longest run ever",
        slug: "Marathon",
        date: {day: 14, month: 2, year: 2025},
        location: "Fredrikstad",
        type: "Marathon",
        seats: 1000,
        waiting_list: false
        },
        {
        id: 3,
        title: "Christmas Market",
        description: "A cozy Christmas Market",
        slug: "Christmas Market",
        date: {day: 20, month: 12, year: 2024},
        location: "Bærum",
        type: "Social Event",
        seats: 1000,
        waiting_list: false
        }
        ]
    })
    
    const customers = await prisma.customers.createMany({
        data: [{
            id: 1,
            name: "Martine!",
            phonenumber: "12345678",
            email: "Martine@hiof.no",
            event_id: 1,
            approved: "Approved"
        },
        {
            id: 2,
            name: "Kim!",
            phonenumber: "12345678",
            email: "Kim@hiof.no",
            event_id: 1,
            approved: "Denied"
        }
    
            ]
        })

    }