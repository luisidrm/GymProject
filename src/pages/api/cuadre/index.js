import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if(req.method ==="GET"){
    const today = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const cuadre = await prisma.sales.groupBy({
      by:["producto"],
      where:{
        fecha:{
          lte: new Date(),
          gte: today()
        }
      },
      _sum:{
        cantidad: true,
        total: true
      }
    })
    console.log(today(), new Date());
    
    console.log(cuadre);
    res.status(200).json({cuadre})
    
  }
}