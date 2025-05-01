"use server";
 
import { Client, Account, Databases, Users, Functions } from "node-appwrite";
import { cookies } from "next/headers";
 
export async function createSessionClient() {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
 
    const session = (await cookies()).get("appwrite-session");
 
    if (!session || !session.value) {
      throw new Error("No session");
    }
 
    client.setSession(session.value);
 
    return {
      get account() {
        return new Account(client);
      },
    };
  }
 
export const createAdminClient = async () => {
  try {
    // Log environment variables for debugging
    console.log('Environment Variables:', {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
      hasKey: !!process.env.NEXT_APPWRITE_KEY
    });

    if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
      throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined');
    }
    if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT) {
      throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT is not defined');
    }
    if (!process.env.NEXT_APPWRITE_KEY) {
      throw new Error('NEXT_APPWRITE_KEY is not defined');
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
      .setKey(process.env.NEXT_APPWRITE_KEY);

    return {
      account: new Account(client),
      database: new Databases(client),
      user: new Users(client),
      functions: new Functions(client)
    };
  } catch (error) {
    console.error('Error in createAdminClient:', error);
    throw error;
  }
};