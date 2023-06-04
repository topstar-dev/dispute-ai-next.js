import getAllClients from "@/lib/getAllClients"
import { Client, User } from "@/typings"
import { create } from "zustand"

type ClientStore = {
	currentUserId: number | null
	currentUser: number | null
	isLoading: boolean
	error: null
	clients: any[] | null
	getClients: () => void
	setcurrentUserId: (user: User) => void
}

export const useAppStore = create<ClientStore>((set) => ({
	currentUserId: null,
	currentUser: null,
	isLoading: true,
	error: null,
	clients: [],
	getClients: async () => {
		try {
			const allClients = await getAllClients()
			set({ isLoading: false, clients: allClients })
		} catch (err) {
			set({ error: err.message, isLoading: false })
		}
	},
	setcurrentUserId: (id) => {
		set({ currentUserId: id })
	},
	setCurrentUser: (user: User) => {
		set({ currentUser: user })
	},
}))
