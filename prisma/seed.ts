import { PrismaClient } from '@prisma/client'
import { generateAvailabilitySlots } from '../app/lib/bookings'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const tuftingCategory = await prisma.category.upsert({
    where: { slug: 'tufting' },
    update: {},
    create: {
      name: 'Tufting',
      slug: 'tufting',
      description: 'Custom tufting workshops and sessions',
      image: '/images/tufting-category.jpg',
    },
  })

  const workshopCategory = await prisma.category.upsert({
    where: { slug: 'workshops' },
    update: {},
    create: {
      name: 'Workshops',
      slug: 'workshops',
      description: 'Group workshops and classes',
      image: '/images/workshop-category.jpg',
    },
  })

  console.log('✅ Categories created')

  // Create services
  const beginnerTufting = await prisma.service.upsert({
    where: { slug: 'beginner-tufting' },
    update: {},
    create: {
      name: 'Beginner Tufting Session',
      slug: 'beginner-tufting',
      description: 'Perfect for first-time tufters! Learn the basics of tufting in this hands-on session.',
      shortDescription: 'Learn the basics of tufting',
      image: '/images/beginner-tufting.jpg',
      price: 75.00,
      duration: 120, // 2 hours
      categoryId: tuftingCategory.id,
    },
  })

  const advancedTufting = await prisma.service.upsert({
    where: { slug: 'advanced-tufting' },
    update: {},
    create: {
      name: 'Advanced Tufting Workshop',
      slug: 'advanced-tufting',
      description: 'Take your tufting skills to the next level with advanced techniques and complex designs.',
      shortDescription: 'Advanced tufting techniques',
      image: '/images/advanced-tufting.jpg',
      price: 120.00,
      duration: 180, // 3 hours
      categoryId: tuftingCategory.id,
    },
  })

  const groupWorkshop = await prisma.service.upsert({
    where: { slug: 'group-workshop' },
    update: {},
    create: {
      name: 'Group Tufting Workshop',
      slug: 'group-workshop',
      description: 'Bring your friends and family for a fun group tufting experience!',
      shortDescription: 'Group tufting experience',
      image: '/images/group-workshop.jpg',
      price: 60.00,
      duration: 150, // 2.5 hours
      categoryId: workshopCategory.id,
    },
  })

  console.log('✅ Services created')

  // Generate availability slots for the next 30 days
  const today = new Date()
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(today.getDate() + 30)

  await generateAvailabilitySlots(
    beginnerTufting.id,
    today,
    thirtyDaysFromNow,
    { start: '10:00', end: '18:00' },
    120 // 2-hour slots
  )

  await generateAvailabilitySlots(
    advancedTufting.id,
    today,
    thirtyDaysFromNow,
    { start: '10:00', end: '18:00' },
    180 // 3-hour slots
  )

  await generateAvailabilitySlots(
    groupWorkshop.id,
    today,
    thirtyDaysFromNow,
    { start: '10:00', end: '18:00' },
    150 // 2.5-hour slots
  )

  console.log('✅ Availability slots generated')

  // Create pricing plans
  const basicPlan = await prisma.plan.upsert({
    where: { id: 'basic-plan' },
    update: {},
    create: {
      id: 'basic-plan',
      name: 'Basic Plan',
      description: 'Perfect for occasional tufting sessions',
      price: 29.99,
      interval: 'month',
      features: JSON.stringify([
        'Access to beginner sessions',
        'Basic materials included',
        'Community support',
      ]),
    },
  })

  const premiumPlan = await prisma.plan.upsert({
    where: { id: 'premium-plan' },
    update: {},
    create: {
      id: 'premium-plan',
      name: 'Premium Plan',
      description: 'For serious tufting enthusiasts',
      price: 59.99,
      interval: 'month',
      features: JSON.stringify([
        'Access to all sessions',
        'Premium materials included',
        'Priority booking',
        'Advanced workshops',
        'One-on-one support',
      ]),
    },
  })

  console.log('✅ Pricing plans created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
