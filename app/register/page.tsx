"use client"

import { getUserData } from "@/appwrite"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const RegisterForm = dynamic(() => import("@/app/register/RegisterForm"), {
	ssr: false,
})

export default function RegisterPage() {
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
			<RegisterForm />
		</div>
	)
}
