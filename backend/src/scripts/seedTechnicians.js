require('dotenv').config()
const { connectMongo } = require('../utils/connectMongo')
const { Technician } = require('../models/Technician')

async function run() {
  await connectMongo()

  const base = [
    {
      name: 'Arjun Mehta',
      city: 'Delhi',
      experienceYears: 6,
      rating: 4.8,
      jobsCompleted: 420,
      onTimeRate: 95,
      specialties: ['AC Install', 'Copper piping', 'Drilling'],
    },
    {
      name: 'Neha Sharma',
      city: 'Noida',
      experienceYears: 4,
      rating: 4.7,
      jobsCompleted: 280,
      onTimeRate: 93,
      specialties: ['AC Install', 'Service', 'Gas refill'],
    },
    {
      name: 'Imran Khan',
      city: 'Gurugram',
      experienceYears: 7,
      rating: 4.9,
      jobsCompleted: 530,
      onTimeRate: 96,
      specialties: ['AC Install', 'Service', 'Wall bracket'],
    },
    {
      name: 'Priya Nair',
      city: 'Delhi',
      experienceYears: 5,
      rating: 4.6,
      jobsCompleted: 310,
      onTimeRate: 92,
      specialties: ['AC Install', 'Service'],
    },
  ]

  await Technician.deleteMany({})
  await Technician.insertMany(base)

  // eslint-disable-next-line no-console
  console.log(`Seeded ${base.length} technicians`)
  process.exit(0)
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})

