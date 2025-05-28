import formidable from "formidable";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try{
      const { id,nombre, description, venta } = req.body.data.element
      const editProduct = await prisma.shop.update({
        where: {
          id: id,
      },
      data: {
        nombre,
        description,
        venta: Number.parseFloat(venta),
      },
    });
    res.status(200).json({message: "Elemento modificado con exitos", product:editProduct})
  }catch(err){
    res.status(500).json({message: "Ocurrio un error en el servidor", error:err})
  }finally{
    prisma.$disconnect()
  }

  }
}