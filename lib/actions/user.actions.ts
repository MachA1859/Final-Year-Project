"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  APPWRITE_SEND_OTP_FUNCTION_ID: SEND_OTP_FUNCTION_ID,
  APPWRITE_VERIFY_OTP_FUNCTION_ID: VERIFY_OTP_FUNCTION_ID,
} = process.env;

export const getUserInfo = async ({userId}: getUserInfoProps) => {
  try {
    const {database} = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])],
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
}

export const signIn = async ({email, password}: signInProps) => {
    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
      // Set the session cookie
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return {
        session
      };
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
}

export const verifyOTP = async ({userId, otp}: {userId: string, otp: string}) => {
  try {
    const { functions } = await createAdminClient();
    
    const verifyOTPResponse = await functions.createExecution(
      VERIFY_OTP_FUNCTION_ID!,
      JSON.stringify({ userId, otp })
    );

    console.log('Verify OTP Response:', verifyOTPResponse);

    if (!verifyOTPResponse || !verifyOTPResponse.responseBody) {
      throw new Error('Failed to verify OTP');
    }

    const verificationResponse = JSON.parse(verifyOTPResponse.responseBody);
    
    if (!verificationResponse.success) {
      throw new Error(verificationResponse.message);
    }

    return verificationResponse;
  } catch (error) {
    console.error("Error verifying OTP", error);
    throw error;
  }
}

export const signUp = async ({password, ...userData}: SignUpParams) => {
    const { email, firstName, lastName } = userData;
    
    let newUserAccount;

    try {
      console.log("Admin client created with API key:", process.env.NEXT_APPWRITE_KEY);
      const { account, database } = await createAdminClient();
  
      newUserAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`
      );

      if(!newUserAccount) throw new Error("Failed to create user account");
  
      const dwollaCustomerUrl = await createDwollaCustomer({
        ...userData,
        type: "personal",
      })

      if(!dwollaCustomerUrl) throw new Error("Failed to create Dwolla customer");

      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

      const newUser = await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
          ...userData,
          userId: newUserAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl,
        }
      )

      const session = await account.createEmailPasswordSession(email, password);
  
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return parseStringify(newUser);
    } catch (error) {
      console.error('Error', error);
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();

      const user = await getUserInfo({userId: result.$id});

      return parseStringify(user);
    } catch (error) {
      return null;
    }
}

export const logoutAccount = async () => {
  try {
    const {account} = await createSessionClient();

    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`, 
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({linkToken: response.data.link_token});
  } catch (error) {
    console.log("Error", error);
  }
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const {database} = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      },
    )

    return parseStringify(bankAccount);
  } catch (error) {
    
  }
}

export const exchangePublicToken = async ({publicToken, user}: exchangePublicTokenProps) => {
  try {
    // Excahnge the public token for an access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({ access_token: accessToken });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw and error
    if (!fundingSourceUrl) throw Error("Failed to create funding source URL");

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL and shareable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    })

    // Revalidate the path to reflect the changes made
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "success",
    });
  } catch (error) {
    console.log("An error occured while creating exchange token", error);
  }
}

export const getBanks = async ({userId}: getBanksProps) => {
  try {
    const {database} = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])],
    )

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error);
  }
}

export const getBank = async ({documentId}: getBankProps) => {
  try {
    const {database} = await createAdminClient();

    // Remove any query parameters from the document ID
    const cleanDocumentId = documentId.split('?')[0];

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [cleanDocumentId])],
    )

    if (bank.total === 0) {
      console.error('Bank not found for document ID:', cleanDocumentId);
      return null;
    }

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error('Error getting bank:', error);
    return null;
  }
}

export const getBankByAccountId = async ({ accountId }: { accountId: string }) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('accountId', accountId)]
    );

    if (bank.total === 0) throw new Error('Bank not found');

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error('Error getting bank by account ID:', error);
    throw error;
  }
};