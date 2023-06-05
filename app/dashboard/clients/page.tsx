import ClientContainer from "./ClientContainer"

async function getData(): Promise<Client[]> {
	const res = await fetch("https://dummyjson.com/users")
	const data = await res.json()
	return data.users
}

export default async function ClientPage() {
	return (
		<>
			<ClientContainer />
		</>
	)
}
