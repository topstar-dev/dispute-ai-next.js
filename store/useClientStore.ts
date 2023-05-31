import getAllClients from "@/lib/getAllClients"
import { Client } from "@/typings"
import { create } from "zustand"

type ClientStore = {
	currentClientId: number | null
	isLoading: boolean
	error: null
	clients: Client[] | null
	getClients: () => void
	setcurrentClientId: (id: number) => void
}

export const useClientStore = create<ClientStore>((set) => ({
	currentClientId: null,
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
	setcurrentClientId: (id) => {
		set({ currentClientId: id })
	},
}))
