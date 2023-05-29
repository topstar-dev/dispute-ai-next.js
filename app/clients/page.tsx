import { columns } from "./columns"
import { TableData } from "./tableData"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from 'next/dynamic';
// const d3 = dynamic(() => import("d3"), {ssr: false});
// const GaugeComponent = dynamic(() => import("react-gauge-component"), {ssr: false});

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
				<Skeleton className="h-10 w-80 bg-white/10 text-3xl"> </Skeleton>
				<div className="grid h-40 grid-cols-3 gap-5 border border-yellow-500">
					<div className="flex flex-col items-center">
						<Skeleton className="flex max-h-28 w-full flex-1 items-center justify-center rounded-t-full bg-white/10"></Skeleton>
						<p className="text-xs">Last updated: May 27th, 2023</p>
					</div>
					<div className="flex flex-col items-center">
						<Skeleton className="flex max-h-28 w-full flex-1 items-center justify-center rounded-t-full bg-white/10"></Skeleton>
						<p className="text-xs">Last updated: May 27th, 2023</p>
					</div>
					<div className="flex flex-col items-center">
						<Skeleton className="flex max-h-28 w-full flex-1 items-center justify-center rounded-t-full bg-white/10"></Skeleton>
						<p className="text-xs">Last updated: May 27th, 2023</p>
					</div>
				</div>
			</div>
		</div>
	)
}
