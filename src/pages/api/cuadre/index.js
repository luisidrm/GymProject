import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    const {centro} = req.query
    const selector = Number.parseInt(centro)
    const today = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const cuadre = await prisma.sales.groupBy({
      by: ["producto"],
      where: {
        centroId: selector,
        fecha: {
          lte: new Date(),
          gte: today()
        }
      },
      _sum: {
        cantidad: true,
        total: true
      }
    })
    const cuadreFull = await Promise.all(
      cuadre.map(async (element, index) => {
        const item = await prisma.shop.findFirst({
          where: { nombre: element.producto }
        });

        return {
          ...cuadre[index],
          id: Math.random()*10,
          picture: item?.picture,
          venta: item?.venta,
          compra: item?.compra
        };
      })
    );
    res.status(200).json({ cuadreFull })


  }
}