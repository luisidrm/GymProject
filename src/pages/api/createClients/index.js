import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const trainers = await prisma.entrenadores.findMany();
      const clients = await prisma.clientes.findMany({
        orderBy: {
          numero_inscripcion: 'desc'
        }
      });
      const client = clients.shift() ?? 1
      if (client) {
        return res.status(200).json({ trainers: trainers, client: client });
      }
      return res.status(200).json({ trainers: trainers, client: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  if (req.method === 'POST') {
    const calendar = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    try {
      const {
        nombre, picture, ci, phone, inscription_number, date, plan, schedule, entrenador, status
      } = req.body.data.info;


      const addClient = await prisma.clientes.create({
        data: {
          nombre,
          ci,
          picture,
          numero_inscripcion: inscription_number,
          fecha: date,
          plan,
          horario: schedule,
          telefono: phone,
          id_entrenador: entrenador ?? 1,
          estado: status
        }
      });
      if (status === true) {
        
        const initialDate = new Date().getMonth()
        
        
        const price = await prisma.price.findFirst({})
        await prisma.payments.create({
          data:{
            id_ciente: addClient.id_ciente,
            month: calendar[initialDate],
            amount: price.price
          }
        })
      }
      res.status(200).json({ message: "Cliente agregado exitosamente" });
    } catch (error) {
      res.status(500).json({ error })
    } finally {
      await prisma.$disconnect();
    }
  }
}