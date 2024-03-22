'use client'
import { useState } from 'react';
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"



export default function LoginForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
	
	const signInData = await signIn('credentials', {
	email: email,
	password: password,
	redirect: false,
   });
   
   if(signInData?.error){
   console.log(signInData.error);
	toast({
          title: "Data Tidak Ditemukan",
          description: "Coba untuk Sign up",
        })
   } else {
	router.push('/');
	router.refresh();
	
	toast({
          title: "Login Berhasil",
          description: "Selamat datang di Dashboard",
        })
   }
  }
  
  

  return (
    <form onSubmit={handleSubmit}>
	<div className="flex items-center justify-between px-3">
      <label htmlFor="email">Email</label>
      <input
	  className="border w-1/2 rounded-md"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
	</div>
	 <br />
	<div className="flex items-center justify-between px-3">
      <label htmlFor="password">Password</label>
      <input
	  className="border w-1/2 rounded-md"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
	</div>
	<div className="mx-auto max-w-24 border flex items-center justify-center rounded-md mt-10">
      <button className="" type="submit">Login</button>
	</div>
    </form>
  );
}