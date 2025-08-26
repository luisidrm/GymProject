import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient()

export default async function handler(req, res) {
  if(req.method==="GET"){
    try {
      const centers = await prisma.centro.findMany()
      const movements = await prisma.movimiento.findMany({
        orderBy:{
          fecha:"asc"
        },
        include:{
          producto:true
        }
      })
      res.status(200).json({movements, centers})
    } catch (error) {
      res.status(500).json({message:"Error al obtener los movimientos"})
    }
  }
}