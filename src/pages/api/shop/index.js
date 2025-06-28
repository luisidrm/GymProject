import { PrismaClient } from "@prisma/client";
import fs, { writeFile } from 'node:fs';
import path, { join } from 'node:path';
import bcrypt from "bcryptjs";
import formidable from "formidable";


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

  if (req.method === 'POST') {
    try {

      const fecha = new Date
      const { products, fullPrice } = req.body

      products.map(async (prod) => {
        await prisma.sales.create({
          data: {
            fecha: fecha,
            producto: prod.nombre,
            precio: prod.venta,
            cantidad: prod.cantidad !== undefined ? prod.cantidad : 1,
            // cantidad: 0,
            // total:0
            total: prod.cantidad !== undefined ? prod.cantidad * prod.venta : prod.venta
          }
        })
      })
      res.status(200).json({ message: "Venta completada" })
    } catch (error) {
      console.error(error)
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
        if(err){
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