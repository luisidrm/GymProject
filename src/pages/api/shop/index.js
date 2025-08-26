import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import fs, { writeFile } from 'node:fs';
import path, { join } from 'node:path';
import bcrypt from "bcryptjs";
import formidable from "formidable";


const prisma = new PrismaClient();



export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { centro } = req.query
    const centers = await prisma.centro.findMany()
    const selector = Number.parseInt(centro)
    try {
      const products = await prisma.shop.findMany({
        where: {
          id_centro: selector
        }
      })
      res.status(200).json({ products: products, centers: centers })
    } catch (error) {
      res.status(200).json({ products: [], centers: centers })
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === 'POST') {
    try {

      const fecha = new Date()
      const { centro, products, fullPrice } = req.body

      await Promise.all(products.map(async (prod) => {
        const p = await prisma.stock.findUnique({
          where:{
            productoId:prod.id
          }
        })
        if(p.cantidad>=prod.cantidad){

          await prisma.sales.create({
            data: {
              fecha: fecha,
              producto: prod.nombre,
              precio: new Prisma.Decimal(prod.venta),
              cantidad: new Prisma.Decimal(prod.cantidad !== undefined ? Number.parseFloat(prod.cantidad) : 1),
              total: new Prisma.Decimal(prod.cantidad !== undefined ? Number.parseFloat(prod.cantidad)
              * Number.parseFloat(prod.venta) : Number.parseFloat(prod.venta)),
              centroId: centro
            }
          })
        }else{
          throw new Error("No tienes suficiente producto para completar la venta");
        }
      }))
      res.status(200).json({ message: "Venta completada" })
    } catch (error) {
      res.status(405).json({message: error.message})
    } finally {
      await prisma.$disconnect()
    }

  }
  if (req.method === 'DELETE') {

    const { id } = req.body
    const getProd = (await prisma.shop.findUnique({
      where: {
        id: id
      }
    })).picture
    const hashedPic = getProd.split("/")[getProd.split("/").length - 1]
    const filePath = join(process.cwd(), 'public', 'storage', hashedPic);
    console.log("eso");

    // if (fs.existsSync(filePath)) {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, async (err) => {
        if (err) {
          return res.status(500).json({ message: "Error al eliminar el archivo", err: err })
        }
        await prisma.shop.delete({
          where: {
            id: id
          }
        })
      })

      res.status(200).json({ message: "Producto eliminado correctamente" })
    }
  }
}