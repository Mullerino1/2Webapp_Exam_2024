export const events = [
    {
      id: '1',
      title: 'Rammstein Concert',
      slug: 'Rammstein',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
      arrangements: [
        {
          id: '1',
          title: 'Variabler',
          slug: 'variabler',
          preAmble:
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
          title: 'Løkker',
          slug: 'lokker',
          preAmble:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          text: [],
        },
        {
          id: '3',
          title: 'Deconstruction',
          slug: 'deconstruction',
          preAmble:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          text: [],
        },
      ],
      category: 'Concert',
    },
    {
      id: '2',
      title: 'Christmas Halden',
      slug: 'christmas',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'FoodMarket',
    },
    {
      id: '3',
      title: 'Oslo Marathon',
      slug: 'oslo',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'Marathon',
    },
    {
      id: '4',
      title: 'Nature Walk',
      slug: 'nature',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'Hike',
    },
    {
      id: '5',
      title: 'Katy Perry',
      slug: 'katyperry',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'Concert',
    },
    {
      id: '6',
      title: 'Handball Halden',
      slug: 'handballhalden',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'Handball',
    },
    {
      id: '7',
      title: 'Five Finger Death Punch',
      slug: 'ffdp',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
        arrangements: [],
      category: 'Concert',
    },
  ]
  
  export const users = [
    { id: '1', name: 'Ole Hansen', email: 'ole@email.no' },
    { id: '2', name: 'Sara Olsen', email: 'sara@email.no' },
    { id: '3', name: 'Finn Finnsen', email: 'finn@email.no' },
    { id: '4', name: 'Kari Guttormsen', email: 'kari@email.no' },
    { id: '5', name: 'Sturla Simensen', email: 'sturla@email.no' },
  ]
  
  export const comments = [
    {
      id: '1',
      createdBy: { id: '2', name: 'Sara Olsen' },
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      lesson: { slug: 'variabler' },
    },
    {
      id: '2',
      createdBy: { id: '3', name: 'Finn Finnsen' },
      comment:
        'Dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      lesson: { slug: 'variabler' },
    },
  ]
  
  export const courseCreateSteps = [
    { id: '1', name: 'Kurs' },
    { id: '2', name: 'Leksjoner' },
  ]
  
  export const categories = [
    'Concert',
    'Marathon',
    'Handball',
    'Hike',
    'FoodMarket',
    'Empty',
  ]