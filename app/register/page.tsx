import { getUserData } from "@/appwrite"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const RegisterForm = dynamic(() => import("@/app/register/RegisterForm"), {
	ssr: false,
})

export default function RegisterPage() {

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-y-hidden  bg-[#14141f] text-white">
			<RegisterForm />
		</div>
	)
}
