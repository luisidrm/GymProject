import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res){
  if(req.method==="GET"){
    try{
      const centers = await prisma.centro.findMany({})
      res.status(200).json({centers:centers})
    }catch(error){
      res.status(500).json({error, message:"Ha ocurrido un error. Intentelo nuevamente"})
    }
  }
  if(req.method === "POST"){
    const {centro, direccion, horario} = req.body
    try{
      await prisma.centro.create({
        data:{
          nombre:centro,
          direccion:direccion,
          horario:horario
        }
      })
      res.status(200).json({message:"Centro creado exitosamente"})
    }catch(error){
      res.status(500).json({message:"Ocurrio un error. Intentelo de nuevo"})
    }
  }
}