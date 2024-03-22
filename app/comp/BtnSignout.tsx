'use client'

import { signOut } from "next-auth/react"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function UserAccountnav () {
	const { toast } = useToast()
	return (
	<>
	<button onClick={() => {
		signOut({
			redirect: true,
			callbackUrl: `${window.location.origin}/signin`
	
		})
		toast({
          title: "Anda Telah Log Out",
          description: "Jangan Lupa Login Kembali",
        });
	}} variant="destructive">Sign Out</ button>
	
	</>
	)
}