import { NextResponse } from "next/server"
import  db  from "@/app/libs/db"
import bcrypt from 'bcrypt'

//Schema for input validation

	
export async function POST(req:any){
	try {
		console.log("ini bisa")
		const { nama, email, password } = await req.json();
		
		const hash = await bcrypt.hash(password, 12);
		
		
		
		//checkc
		const existingUserByEmail = await db.user.findUnique({
			where: { email: email }
		});
		
		if(existingUserByEmail){
			console.log("email sudah terdaftar")
			return NextResponse.json({ user:null, message: "User with this email already exist"}, { status: 409 })
		}
		

		
		const newUser = await db.user.create({
			data: {
				nama,
				email,
				password: hash
			}
		});
		
		const { password: newUserPassword, ...rest } = newUser;
		
		return NextResponse.json({user: newUser,message: "User created successfully"}, {status: 201});
	} catch (error) {
		return NextResponse.json({message: "Something went wrong"}, {status: 501});
	}
}