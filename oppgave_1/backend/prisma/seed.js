import { PrismaClient } from '@prisma/client'
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
const prisma = new PrismaClient()
async function main() {
  const courses = await prisma.courses.createMany({
    data: [
            {
              id: '1',
              title: 'JavaScript 101',
              slug: 'javascript-101',
              description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',                           
              category: 'code',
            },
            {
                id: '2',
                title: 'Python 101',
                slug: 'python-101',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'code',
              },
              {
                id: '3',
                title: 'Layers 101',
                slug: 'layers-101',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'photoshop',
              },
              {
                id: '4',
                title: 'SEO',
                slug: 'seo',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'marketing',
              },
              {
                id: '5',
                title: 'Intro til tegning',
                slug: 'intro-tegning',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'design',
              },
              {
                id: '6',
                title: 'Videoproduksjon 101',
                slug: 'videoproduksjon-101',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'video',
              },
              {
                id: '7',
                title: 'UI Design 101',
                slug: 'ui-design-101',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'web',
              },
              {
                id: '8',
                title: 'CRO',
                slug: 'cro',
                description:
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                category: 'analytics',
              },
        ]})
        const users = await prisma.users.createMany({
          data: [
            { id: '1', name: 'Ole Hansen', email: 'ole@email.no', admin: false },
            { id: '2', name: 'Sara Olsen', email: 'sara@email.no', admin: false },
            { id: '3', name: 'Finn Finnsen', email: 'finn@email.no', admin: false },
            { id: '4', name: 'Kari Guttormsen', email: 'kari@email.no', admin: false },
            { id: '5', name: 'Sturla Simensen', email: 'sturla@email.no', admin: false },
          ]
        })
        const lessons = await prisma.lessons.createMany({
          data: [
            {
              id: '1',
              course_id: '1',
              title: 'Variabler',
              slug: 'variabler',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
              text: [
                {
                  id: '1',
                  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
                },
                {
                  id: '2',
                  text: 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                },
              ],
            },
            {
              id: '2',
              course_id: '1',
              title: 'Løkker',
              slug: 'lokker',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
              text: [],
            },
            {
              id: '3',
              course_id: '1',
              title: 'Deconstruction',
              slug: 'deconstruction',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
              text: [],
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