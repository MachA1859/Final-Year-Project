import { ID, Query } from "appwrite";

import { appwriteConfig, databases } from "./config";

export const createTransaction = async (transaction: {
  $id: string;
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}) => {
  try {
    const newTransaction = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transactionCollectionId,
      transaction.$id,
      transaction
    );

    return newTransaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
}; 