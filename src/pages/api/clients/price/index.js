import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST'){
    const {price} = req.body
    const fecha = new Date

    const getPrice = await prisma.price.findFirst({})


    if(getPrice===null){
      await prisma.price.create({
        data:{
          date: fecha,
          price: Number.parseFloat(price)
        }
      })
    }else{
      await prisma.price.update({
        where:{
          id:getPrice.id
        },
        data:{
          date: fecha,
          price:Number.parseFloat(price)
        }
      })
    }
    res.status(200).json({message:"Precio actualizado"})
  }
}