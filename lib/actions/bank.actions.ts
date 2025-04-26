"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

// import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharaebleId: bank.shareableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    return parseStringify({
      data: account,
      transactions: transactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  try {
    // Mock transaction data
    const mockTransactions = [
      {
        id: "1",
        name: "Grocery Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -45.67,
        pending: false,
        category: "Food & Drink",
        date: "2024-04-25",
        image: "https://picsum.photos/200"
      },
      {
        id: "2",
        name: "Salary Deposit",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 2500.00,
        pending: false,
        category: "Income",
        date: "2024-04-24",
        image: "https://picsum.photos/200"
      },
      {
        id: "3",
        name: "Netflix Subscription",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -15.99,
        pending: false,
        category: "Entertainment",
        date: "2024-04-23",
        image: "https://picsum.photos/200"
      },
      {
        id: "4",
        name: "Gas Station",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -35.20,
        pending: false,
        category: "Transportation",
        date: "2024-04-22",
        image: "https://picsum.photos/200"
      },
      {
        id: "5",
        name: "Restaurant",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -78.50,
        pending: false,
        category: "Food & Drink",
        date: "2024-04-21",
        image: "https://picsum.photos/200"
      },
      {
        id: "6",
        name: "Amazon Purchase",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -120.75,
        pending: false,
        category: "Shopping",
        date: "2024-04-20",
        image: "https://picsum.photos/200"
      },
      {
        id: "7",
        name: "Interest Payment",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 2.50,
        pending: false,
        category: "Income",
        date: "2024-04-19",
        image: "https://picsum.photos/200"
      },
      {
        id: "8",
        name: "Gym Membership",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -29.99,
        pending: false,
        category: "Health & Fitness",
        date: "2024-04-18",
        image: "https://picsum.photos/200"
      },
      {
        id: "9",
        name: "Coffee Shop",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -4.50,
        pending: false,
        category: "Food & Drink",
        date: "2024-04-17",
        image: "https://picsum.photos/200"
      },
      {
        id: "10",
        name: "Phone Bill",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -65.00,
        pending: false,
        category: "Utilities",
        date: "2024-04-16",
        image: "https://picsum.photos/200"
      }
    ];

    return parseStringify(mockTransactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
    return [];
  }
};