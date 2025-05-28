import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clients = await prisma.clientes.findMany()

      const extraInfoClients = await Promise.all(
        clients.map(async (client) => {
          if (client.id_entrenador!==null) {
          const trainers = await prisma.entrenadores.findMany({
            where: {
              id_entrenador: client.id_entrenador 
            },
            take: 1
          })
            const eso = { ...client, nombre_entrenador: trainers[0].nombre }
            return eso
          }
          return { ...client, nombre_entrenador: "Sin entrenador" }
        })
      )
      const price = await prisma.price.findFirst()

      if (price) {
        res.status(200).json({ clients: extraInfoClients, price: price.price })
      } else {
        res.status(200).json({ clients: extraInfoClients })
      }


    } catch (error) {
      console.error(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  if (req.method === 'DELETE') {
    const { id_ciente } = req.body
    console.log(id_ciente);


    const deleteClient = await prisma.clientes.delete({
      where: {
        id_ciente: id_ciente
      }
    })
    res.status(200).json({ message: "Cliente eliminado correctamente", deleteClient })

  }
}
export async function resetClientStatuses() {
  try {
    await prisma.clientes.updateMany({
      data: {
        status: false,
      },
    });
    alert('All client statuses have been reset to false');
  } catch (error) {
    console.error('Error resetting client statuses:', error);
  } finally {
    await prisma.$disconnect();
  }
}
