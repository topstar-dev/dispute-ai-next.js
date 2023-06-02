"use client"

import React from "react"
import { account } from "../appwrite"

export function LogoutButton() {
	const handleLogout = async () => {
		const promise = await account.deleteSession("current")
	}
	return (
		<button className="flex h-10 w-auto cursor-pointer items-center justify-center rounded-md bg-white px-6 text-[#14141f]" onClick={handleLogout}>
			Logout
		</button>
	)
}
