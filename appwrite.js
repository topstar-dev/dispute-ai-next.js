import { Client, Account, ID, Databases, Storage } from 'appwrite';

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const getUserData = async () => {
    try {
        const user = await account.get();
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}


export {
    client,
    account,
    databases,
    storage,
    ID,
    getUserData
}