'use client'

import { useRouter } from "next/navigation"

export default function Btn() {

	const router = useRouter();
	
	const handleRefresh = () => {
		router.refresh();
		
		
	}
	
	return (
		<button onClick={handleRefresh} type="submit" className="border-2  font-bold py-2 px-4 rounded">
                Sign Up
            </button>
	
	)

}