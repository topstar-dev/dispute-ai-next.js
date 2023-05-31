"use client"

import { ColumnDef, flexRender, getCoreRowModel, ColumnFiltersState, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface TableDataProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function TableData<TData, TValue>({ columns, data }: TableDataProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [rowSelection, setRowSelection] = useState({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
			rowSelection,
		},
	})

	return (
		<div className="flex h-full flex-col gap-3 text-white">
			<div className="flex h-12 items-center justify-between py-4">
				<Input placeholder="Filter names..." value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)} className="max-w-sm" />

				<p className="">{table.getFilteredRowModel().rows.length} Clients</p>
			</div>

			<div className="flex flex-1 overflow-y-auto ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow  key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="h-16 w-full flex justify-center items-end">
				<div className="flex justify-center space-x-2">
					<button className="flex h-10 w-10 items-center justify-center rounded-md  bg-white/10 hover:bg-white/20 disabled:cursor-default disabled:opacity-10 disabled:hover:bg-white/10" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
						</svg>
					</button>
					<button className="flex h-10 w-10 items-center justify-center rounded-md  bg-white/10 hover:bg-white/20 disabled:cursor-default disabled:opacity-10 disabled:hover:bg-white/10" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
