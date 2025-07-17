import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.shop.findMany()
      res.status(200).json({ products: products })
    } catch (error) {
      res.status(200).json({ products: [] })
    } finally {
      await prisma.$disconnect()
    }
  }
}