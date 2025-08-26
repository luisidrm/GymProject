import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'luisidrm';
  const salt = bcrypt.genSaltSync(10);

  const plainPassword = 'Password0912+'; // Replace with your desired password
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const existingUser = await prisma.user.findUnique({
    where: { nombre: username },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        nombre: username,
        password: hashedPassword,
        rol: 'Administrador', // Assuming you want this role
      },
    });
    console.log(`✅ User '${username}' created successfully.`);
  } else {
    console.log(`ℹ️ User '${username}' already exists.`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });