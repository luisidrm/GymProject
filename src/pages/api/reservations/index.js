import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const allReservations = await prisma.reservation.findMany()
    res.status(200).json({ reservations: allReservations})
    // res.status(500).json({ message: "Error en el servidor", error: err })

  }
  if (req.method === "POST") {
    try {
      const { nombre, cantidad, numero, fecha, horario, especial } = req.body.reservation


      const newReservation = await prisma.reservation.create({
        data: {
          nombre: nombre,
          numero: numero,
          fecha: new Date(fecha),
          horario: horario,
          cantidad: Number.parseInt(cantidad),
          especial: especial || null
        }
      })

      res.status(200).json({ message: "Reservacion agregada correctamente" })
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: "Ocurrio un error en la reservacion", error: err })
    }
  }
  if (req.method === "DELETE") {
    const {id}  = req.body
    
    try {
    
      const deleteReserv = await prisma.reservation.delete({
        where: {
          id: id
        }
      })
      res.status(200).json({ message: "Reservacion eliminada correctamente", deleteReserv })
    } catch (err) {
      res.status(500).json({ message: "Ocurrio un error en la eliminacion" })
    }
  }



}