import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req,res) {
  if(req.method==='POST'){
    const {id,month, price} = req.body

    const isPay = await prisma.payments.findFirst({
      where:{
        id_ciente:id,
        month:month
      }
    })
    if (isPay){
      res.status(200).json({message:"El cliente ya ha pagado"})
    }else{
      await prisma.payments.create({
        data:{
          id_ciente:id,
          month:month,
          amount:Number.parseFloat(price)
        }
      }).then(async()=>{
        await prisma.clientes.update({
          where:{
            id_ciente:id
          },
          data:{
            estado:true
          }
        })
        res.status(200).json({message:"Pago Completado"})
      }).catch((err)=>{
        console.error(err)
      })
    }

    }
    if(req.method==='PATCH'){
      const {reset} = req.body

      if(reset){
        const allClients = await prisma.clientes.findMany({})
        allClients.map(async(client)=>{
          await prisma.clientes.update({
            where:{
              id_ciente:client.id_ciente,
            },
            data:{
              estado:false
            }
          })
        })
      }
      res.status(200).json({message:"Nuevo mes actualizado"})
    }    
  
}