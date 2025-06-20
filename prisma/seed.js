import { PrismaClient } from '@prisma/client'
import { subYears, subMonths, set } from 'date-fns'

const prisma = new PrismaClient()

const sampleBiller = {
  name: 'Default Biller',
}

const sampleCustomer = {
  name: 'Ali Raza',
  contact: '03211234567',
}

const productIds = [
  '6850fd062ed42c233474c95d',
  '6850fd062ed42c233474c95e',
  '6851205e3d69b4f6439c4556',
]

const getRandomDate = (year, month) => {
  const day = Math.floor(Math.random() * 28) + 1
  return set(new Date(year, month, day), {
    hours: Math.floor(Math.random() * 12) + 8,
    minutes: Math.floor(Math.random() * 60),
  })
}

const seedSales = async () => {
  const biller = await prisma.biller.create({ data: sampleBiller })
  const customer = await prisma.customer.create({ data: sampleCustomer })

  const years = [2022, 2023, 2024]
  const salesData = []

  for (const year of years) {
    for (let month = 0; month < 12; month++) {
      const saleDate = getRandomDate(year, month)

      const items = productIds.map((productId) => {
        const quantity = Math.floor(Math.random() * 5) + 1
        const unitPrice = 100 + Math.random() * 200
        return {
          productId,
          quantity,
          unitPrice,
        }
      })

      const totalAmount = items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      )

      salesData.push({
        saleDate,
        totalAmount,
        billerId: biller.id,
        customerId: customer.id,
        saleItems: {
          create: items,
        },
        receipt: {
          create: {
            paymentMethod: 'Cash',
            paidAmount: totalAmount,
          },
        },
      })
    }
  }

  for (const sale of salesData) {
    await prisma.sale.create({
      data: sale,
    })
  }

  console.log('✅ Seeded sales data for multiple years and months.')
}

seedSales()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
