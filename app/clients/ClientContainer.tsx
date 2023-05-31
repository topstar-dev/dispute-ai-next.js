"use client"

import { ScoreGauges } from "@/components/client/ScoreGauges"
import { TableData } from "./TableData"
import { columns } from "./columns"
import { useClientStore } from "@/store/useClientStore"
import { useEffect } from "react"

export default function ClientContainer() {
	const getClients = useClientStore((state) => state.getClients)
	const clients = useClientStore((state) => state.clients)

	useEffect(() => {
		getClients()
	}, [getClients])

	return (
		<div className="flex h-full gap-10 divide-x-2 divide-white/20 pt-5">
			<div className="flex-1">
				<TableData columns={columns} data={clients} />
			</div>
			<div className="flex flex-1 flex-col gap-5 p-5 pr-0 text-white">
				<ScoreGauges data={clients} />
			</div>
		</div>
	)
}
