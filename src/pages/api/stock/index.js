import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { centro } = req.query
  
    const selector = Number.parseInt(centro)
    try {
      const products = await prisma.shop.findMany({
        where:{
          id_centro: selector
        }
    })
      const allProducts = await Promise.all(
      products.map(async(prod, index)=>{
        const stock = await prisma.stock.findUnique({
          where:{
            productoId:prod.id,
          }
        })
        return{
          ...products[index],
          cantidad: Number.parseFloat(stock?.cantidad)
        }
      })
    )
    console.log(allProducts);
    
    res.status(200).json({allProducts})

    } catch (error) {
      res.status(500).json({error})
    }
  }
  if(req.method==="POST"){
    const {operation, description, prods} = req.body
    const date = new Date()

    try {
      if(operation==="ENTRADA"){
        prods.map(async(prod)=>{
          await prisma.stock.upsert({
            where:{
              productoId: prod.id
            },
            update:{
              cantidad: {
                increment: prod.modification
              }
            },
            create:{
              productoId: prod.id,
              cantidad: prod.modification
            }
          })
          await prisma.movimiento.create({
            data:{
              productoId: prod.id,
              tipo: operation,
              cantidad: prod.modification,
              nota: description,
              fecha: date
            }
          })
        })
    }
    if (operation==="SALIDA"){
      prods.map(async(prod)=>{
        const stock = await prisma.stock.findUnique({
          where:{
            productoId: prod.id
          }
        })
        if(stock.cantidad<prod.modification){
          throw new Error("No hay suficiente stock para realizar la operacion")
        }
        await prisma.stock.update({
          where:{
            productoId: prod.id
          },
          data:{
            cantidad: {
              decrement: prod.modification
            }
          }
        })
        await prisma.movimiento.create({
          data:{
            productoId: prod.id,
            tipo: operation,
            cantidad: prod.modification,
            nota: description,
            fecha: date
          }
        })
      })
    }
    res.status(200).json({message: "Existencia actualizado"})
  }catch (error) {
      res.status(405).json({error: error.message})
    }
  }
} 