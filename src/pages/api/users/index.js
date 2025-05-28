import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { user, password } = req.body.data;
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

    res.status(200).json({ message: addUser });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  } finally {
    await prisma.$disconnect();
  }
}
