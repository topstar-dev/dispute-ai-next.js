"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Client = {
	id: number
	firstName: string
	lastName: string
	maidenName: string
	age: number
	gender: "male" | "female" | "other"
	email: string
	phone: string
	username: string
	password: string
	birthDate: string
	image: string
	bloodGroup: string
	height: number
	weight: number
	eyeColor: string
	hair: {
		color: string
		type: string
	}
	domain: string
	ip: string
	address: {
		address: string
		city: string
		coordinates: {
			lat: number
			lng: number
		}
		postalCode: string
		state: string
	}
	macAddress: string
	university: string
	bank: {
		cardExpire: string
		cardNumber: string
		cardType: string
		currency: string
		iban: string
	}
	company: {
		address: {
			address: string
			city: string
			coordinates: {
				lat: number
				lng: number
			}
			postalCode: string
			state: string
		}
		department: string
		name: string
		title: string
	}
	ein: string
	ssn: string
	userAgent: string
}

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
			return (
				<div className=" max-w-[15rem]">
					{ `${first} ${last}`}
				</div>
			)
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

			return (
				<div className="flex justify-end">
					<div className="relative -left-2">
						<DropdownMenu classs="bg-white">
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
									<span className="sr-only">Open menu</span>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="bg-[#3c3c3c] text-white" align="end">
								<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>View profile</DropdownMenuItem>
								{/* <DropdownMenuSeparator /> */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			)
		},
	},
]
