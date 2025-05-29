import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if(req.method==='GET'){
    try{
      const allUsers = await prisma.user.findMany({})
      const users = allUsers.map((user)=>{
        return{
          id: user.id_user,
          nombre: user.nombre
        }
      })
      res.status(200).json({users})
    }catch(error){
      res.status(500).json({message:error})
    }finally{
      await prisma.$disconnect()
    }

  }
  if (req.method === "POST") {

    const { user, password } = req.body.data;
    if(user.length>0&&password.length>8){

      try {
        // Hash the password before storing it in the database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const nombre = user;
        
        // Create the user in the database
        const addUser = await prisma.user.create({
          data: {
            nombre,
            password: hashedPassword,
          },
        });
        
        res.status(200).json({ message: "Usuario creado", user:addUser });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  } finally {
    await prisma.$disconnect();
  }
}else{
  res.status(403).json({message:"El usuario debe tener mas de 3 caracteres y la contraseña mas de 8"})
}
}

  if(req.method==='DELETE'){
    const {id} = req.body
    try {
      await prisma.user.delete({
        where:{
          id_user:id
        }
      })
      res.status(200).json({message:"Usuario eliminado correctamente"})
    } catch (error) {
      res.status(500).json({message:error})
    }
  }
}
