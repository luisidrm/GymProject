import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const {search} = req.query
      const results = await prisma.clientes.findMany({
        where: {
          OR:[{
            nombre: {
              contains: search || "", // Case-insensitive search
              mode: "insensitive",
            }
          },
          {
            numero_inscripcion:{
              equals: Number.parseInt(search) || 0
            }
          }
        
          ]
            
          
        },
      });

      res.status(200).json(results); // Send the results back to the client
    } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).json({ error: "Internal server error" });
    }finally{
      await prisma.$disconnect()
    }
  }
}