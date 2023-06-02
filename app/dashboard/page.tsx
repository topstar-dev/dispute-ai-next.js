"use client"

import { getUserData } from "@/appwrite"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default async function DashboardPage() {
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

	return <></>
}
