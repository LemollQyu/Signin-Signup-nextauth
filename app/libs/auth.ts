import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import db from "@/app/libs/db"
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: '/signin',
	},
  
  providers: [
  CredentialsProvider({
    
    name: "Credentials",
    
    credentials: {
      email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
      password: { label: "Password", type: "password" }
    },
     async authorize(credentials:any) {
	   if(!credentials?.email || !credentials?.password) {
		return null;
	  }
	  
	  const existingUser = await db.user.findUnique({
		where: {email: credentials?.email }
	  });
	  
	  if(!existingUser) {return null}
	  
	  
	  const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password)
	  console.log(passwordMatch)
	  if(!passwordMatch) {return null}
	  
	  return {
		id: `${existingUser.id}`,
		nama: existingUser.nama,
		email: existingUser.email
		}   
      }	
	 }) 	
	],
	callbacks: {
		async jwt({ token, user}) {
		if(user) {
		return {
			...token,
			nama: user.nama,
			
			}
		 }
			return token
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					nama: token.nama,
					
				}
			}
		
		},
	 }
	}
