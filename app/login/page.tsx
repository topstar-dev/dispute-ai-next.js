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
			.catch((error) => {
				router.push("/login")
			})
	}, [])

	return (
		<div className="flex h-full w-screen flex-col items-center justify-center gap-6 text-white">
			<div className="flex text-5xl">
				<p className="font-black tracking-wide">Dispute</p>
				<p className="font-xs font-light">Ai</p>
			</div>
			<LoginForm />
		</div>
	)
}
