import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { signOut } from 'next-auth/react';

const prisma = new PrismaClient();


export async function getUser(username, password) {

  const usuario = await prisma.user.findFirst({
    where: {
      nombre: username
    }
  })
  if (!usuario) return null;

  const isValid = bcrypt.compareSync(password, usuario.password);

  if (isValid) {
    // return the user object in the format NextAuth expects
    return {
      id: usuario.id_user,
      name: usuario.nombre,
      role: usuario.rol
    };
  }

  return null;
}



export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { username, password } = credentials;

        const usuario = await prisma.user.findFirst({
          where: { nombre: username },
        });
        console.log(usuario);
        

        if (!usuario) {
          console.log("User not found");
          return null;
        }

        const passwordMatch = bcrypt.compareSync(password, usuario.password);
        console.log("✅ Password match:", passwordMatch);

        if (!passwordMatch) return null;

        // ✅ Must return a plain object
        return {
          id: usuario.id_user.toString(), // make sure it's a string if using JWT
          name: usuario.nombre,
          role: usuario.rol,
          centro: usuario.id_centro
        };
      },
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }) {
    // This runs at login, attaches user info to the JWT
    if (user) {
      token.id = user.id_user;
      token.name = user.name;
      token.role = user.role
      token.centro = user.centro
    }
    return token;
  },

  async session({ session, token }) {
    // This runs when session is accessed, attaches token info to session
    session.user.id = token.id_user;
    session.user.name = token.name;
    session.user.role = token.role
    session.user.centro = token.centro

    return session;
  },
}
}
export default NextAuth(authOptions)

// GithubProvider({
//   clientId: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET,
// }),