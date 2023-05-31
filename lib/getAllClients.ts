export default async function getAllClients() {
	const res = await fetch("https://dummyjson.com/users")
	const data = await res.json()
    const allClients  = data.users
	return allClients
}