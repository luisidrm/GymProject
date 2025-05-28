import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const trainers = await prisma.entrenadores.findMany()
      const extra_info_trainers = await Promise.all(
        trainers.map(async (trainer) => {

          const clientes = await prisma.clientes.findMany({
            where: {
              id_entrenador: {
                equals: trainer.id_entrenador
              }
            }
          })
          trainer.entrenados = clientes.length
          return trainer
        })
      )

      res.status(200).json({ trainers: extra_info_trainers })
    } catch (error) {
      console.error(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === 'POST') {
    try {
      const { picture, nombre, ci, phone, schedule, entrenados } = req.body.data.info;
      const addTrainer = await prisma.entrenadores.create({
        data: {
          picture,
          nombre,
          ci,
          telefono: phone,
          horario: schedule,
          entrenados: entrenados
        }
      });
      res.status(200).json({ message: 'Entrenador agregado exitosamente' });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  if(req.method==='DELETE'){
    const {id_entrenador}=req.body

    try{
      const deleteTrainer = await prisma.entrenadores.delete({
        where:{
          id_entrenador: id_entrenador
        }
      })
      res.status(200).json({message:"Entrenador eliminado correctamente", deleteTrainer})
    }catch(err){
      console.error(err)
      res.status(500).json({message:"Error al eliminar Entrenador"})
    }finally{
      await prisma.$disconnect()
    }
  }
}