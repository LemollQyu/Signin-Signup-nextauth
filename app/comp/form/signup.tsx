'use client'

import { useState } from 'react';
import {useRouter} from 'next/navigation'
import BtnSignUp from "../BtnSignUp"
import Link from "next/link"

export default function LoginForm () {
	const router = useRouter()

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { nama, email, password };
    console.log(data);
	
	
	
	const response = await fetch('/api/user', {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		nama: nama,
		email: email,
		password: password
	})
   })
   
   
   if(response.ok){
	router.refresh()
	router.push("signin")
	
	alert("silahkan Login")
   } else {
	console.error("registrasi error")
	alert("data tidak terproses");
   }
   
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
	<div className="flex w-full justify-between px-5">
      <label htmlFor="nama">Nama:</label>
      <input
	  className="border rounded-lg"
        type="text"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
	  </div>
      <br />
	<div className="flex w-full justify-between px-5">
      <label htmlFor="email">Email:</label>
      <input
	  className="border rounded-lg"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
	  </div>
      <br />
	
	<div className="flex w-full justify-between px-5">
      <label htmlFor="password">Password:</label>
      <input
	  className="border rounded-lg"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
	  </div>
      <br />
	<div className=" mt-5 flex w-3/4 justify-between mx-auto items-center">	
     <BtnSignUp />
	 <Link className="border-2 rounded  font-bold py-2 px-4" href="/signin">Sign In</Link>
	 </div>
    </form>
  );
}