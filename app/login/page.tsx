"use client"

import { getUserData } from "@/appwrite"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const LoginForm = dynamic(() => import("@/app/login/LoginForm"), {
	ssr: false,
})

export default function LoginPage() {
	const router = useRouter()

	useEffect(() => {
		getUserData()
			.then((account) => {
				router.push("/dashboard")
			})
			.catch((error) => {})
	}, [])

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-y-hidden  bg-[#14141f] text-white">
			<LoginForm />
		</div>
	)
}
