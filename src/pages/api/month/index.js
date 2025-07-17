import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const firstDateOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1)

      const calendar = {
        "Enero": 0,
        "Febrero": 1,
        "Marzo": 2,
        "Abril":3,
        "Mayo":4,
        "Junio":5,
        "Julio":6,
        "Agosto":7,
        "Septiembre":8,
        "Octubre":9,
        "Noviembre":10,
        "Diciembre":11,
      }


      const fullAmount = (await prisma.payments.groupBy({
        by: ["month"],
        _sum: {
          amount: true
        },
      })).map((acc) => {
        return {
          sum: acc._sum.amount,
          month: acc.month
        }
      })
      let response = [] 
      fullAmount.forEach((amount)=>{
        response[calendar[amount.month]] = amount
      })
      response = response.filter((p)=>p!==null && p!==undefined)

      const newSubs = await prisma.clientes.count({
        where: {
          fecha: {
            gte: firstDateOfMonth(new Date()), 
          }
        }
      })

      const activeMembers = await prisma.clientes.count({})

      let yearSales = 0
      
      const netSales = await prisma.sales.findMany({})
      netSales.map((sales)=>{
        yearSales = yearSales + sales.total
      })

      res.status(200).json({ response, newSubs, activeMembers, yearSales })
    } catch (err) {
      console.error(err)
    } finally {
      prisma.$disconnect()
    }
  }




}