import { ScoreGauges } from "@/components/client/ScoreGauges"
import { columns } from "./columns"
import { TableData } from "./tableData"

async function getData(): Promise<Client[]> {
	const res = await fetch("https://dummyjson.com/users")
	const data = await res.json()
	return data.users
}

export default async function DemoPage() {
	const data = await getData()

	return (
		<div className="flex h-full gap-10 divide-x-2 pt-5">
			<div className="flex-1">
				<TableData columns={columns} data={data} />
			</div>
			<div className="flex flex-1 flex-col gap-5 p-5 pr-0 text-white">
				<ScoreGauges data={data} />
			</div>
		</div>
	)
}
