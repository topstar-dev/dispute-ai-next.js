"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Client } from "@/typings"
import { create, useStore } from "zustand"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/store/useAppStore"

export const columns: ColumnDef<Client>[] = [
	{
		accessorKey: "firstName",
		header: ({ column }) => {
			return (
				<div className="flex max-w-[15rem] items-center gap-3 ">
					<button className="flex items-center gap-2" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Client
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
						</svg>
					</button>
				</div>
			)
		},
		cell: ({ row }) => {
			const first = row.original.firstName
			const last = row.original.lastName
			return <div className=" max-w-[15rem]">{`${first} ${last}`}</div>
		},
	},
	{
		accessorKey: "email",
		header: () => {
			return <div className="">Email</div>
		},
	},
	{
		accessorKey: "address.address",
		header: "Address",
	},
	{
		id: "actions",
		header: "Actions",
		header: ({ column }) => {
			return <div className="flex justify-end">Actions</div>
		},
		cell: ({ row }) => {
			const payment = row.original
			const setcurrentUserId = useAppStore((state) => state.setcurrentUserId)

			return (
				<div className="flex justify-end">
					<div className="relative -left-2">
						<Button onClick={() => setcurrentUserId(payment.id - 1)} variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
							<span className="sr-only">Open menu</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</Button>
					</div>
				</div>
			)
		},
	},
]
