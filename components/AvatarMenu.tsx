"use client"

import React, { useState } from "react"
import { account } from "../appwrite"
import { useRouter } from "next/navigation"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Avatar from "react-avatar"
import Lottie from "@novemberfiveco/lottie-react-light"
import animationData from "@/components/json/goodbye.json"
import loadingAnimation from "@/components/json/loading.json"

export function AvatarMenu() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleLogout = async () => {
		setIsLoading(true)
		const promise = await account.deleteSession("current")
		const finisher = setTimeout(() => {
			router.push("/login")
		}, 777)
	}
	return (
		<div className="">
			{isLoading && (
				<div className="absolute inset-0 z-50 bg-[#14161f]">
					<Lottie className="my-auto h-screen" animationData={animationData} loop={false} />
				</div>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="hover:cursor-pointer">
						<Avatar name="Alfredo Natal" size="45" textSizeRatio={2.5} round={true} color="#7783B8" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mt-1 w-56 border-white/10 bg-white/5 text-white backdrop-blur-sm" align="end">
					<DropdownMenuLabel className="text-base font-semibold tracking-wider">Alfredo Natal</DropdownMenuLabel>
					<DropdownMenuSeparator className="bg-[#7783B8]" />
					<DropdownMenuItem className="flex items-center gap-2 rounded-md p-2 text-base outline-none transition-[padding] duration-200 ease-linear hover:cursor-pointer hover:bg-[#7783b8] hover:pl-4">User Settings</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-2 rounded-md p-2 text-base outline-none transition-[padding] duration-200 ease-linear hover:cursor-pointer hover:bg-[#7783b8] hover:pl-4" onClick={handleLogout}>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
