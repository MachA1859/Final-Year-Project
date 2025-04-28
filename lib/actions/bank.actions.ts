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
        date: "2024-04-25T14:30:00",
        image: "https://picsum.photos/200?category=food"
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
        date: "2024-04-24T06:00:00",
        image: "https://picsum.photos/200?category=income"
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
        date: "2024-04-23T00:01:00",
        image: "https://picsum.photos/200?category=entertainment"
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
        date: "2024-04-22T17:45:00",
        image: "https://picsum.photos/200?category=transportation"
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
        date: "2024-04-21T19:20:00",
        image: "https://picsum.photos/200?category=food"
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
        date: "2024-04-20T21:15:00",
        image: "https://picsum.photos/200?category=shopping"
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
        date: "2024-04-19T03:00:00",
        image: "https://picsum.photos/200?category=income"
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
        date: "2024-04-18T00:01:00",
        image: "https://picsum.photos/200?category=fitness"
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
        date: "2024-04-17T08:15:00",
        image: "https://picsum.photos/200?category=food"
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
        date: "2024-04-16T00:01:00",
        image: "https://picsum.photos/200?category=utilities"
      },
      {
        id: "11",
        name: "Electricity Bill",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -85.25,
        pending: false,
        category: "Utilities",
        date: "2024-04-15T00:05:00", // 12:05 AM - automated bill payment
        image: "https://picsum.photos/200"
      },
      {
        id: "12",
        name: "Spotify Subscription",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -9.99,
        pending: false,
        category: "Entertainment",
        date: "2024-04-14T00:01:00", // 12:01 AM - automated subscription
        image: "https://picsum.photos/200"
      },
      {
        id: "13",
        name: "Dentist Visit",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -150.00,
        pending: false,
        category: "Healthcare",
        date: "2024-04-13T14:30:00", // 2:30 PM - afternoon appointment
        image: "https://picsum.photos/200"
      },
      {
        id: "14",
        name: "Uber Ride",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -25.50,
        pending: false,
        category: "Transportation",
        date: "2024-04-12T23:45:00", // 11:45 PM - late night ride
        image: "https://picsum.photos/200"
      },
      {
        id: "15",
        name: "Clothing Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -120.00,
        pending: false,
        category: "Shopping",
        date: "2024-04-11T13:20:00", // 1:20 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "16",
        name: "Freelance Payment",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 500.00,
        pending: false,
        category: "Income",
        date: "2024-04-10T15:00:00", // 3:00 PM - freelance payment
        image: "https://picsum.photos/200"
      },
      {
        id: "17",
        name: "Movie Theater",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -35.00,
        pending: false,
        category: "Entertainment",
        date: "2024-04-09T19:30:00", // 7:30 PM - evening movie
        image: "https://picsum.photos/200"
      },
      {
        id: "18",
        name: "Car Insurance",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -120.00,
        pending: false,
        category: "Insurance",
        date: "2024-04-08T00:01:00", // 12:01 AM - automated payment
        image: "https://picsum.photos/200"
      },
      {
        id: "19",
        name: "Bookstore",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -45.75,
        pending: false,
        category: "Shopping",
        date: "2024-04-07T16:15:00", // 4:15 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "20",
        name: "Bonus Payment",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 1000.00,
        pending: false,
        category: "Income",
        date: "2024-04-06T06:00:00", // 6:00 AM - morning deposit
        image: "https://picsum.photos/200"
      },
      {
        id: "21",
        name: "Pharmacy",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -35.25,
        pending: false,
        category: "Healthcare",
        date: "2024-04-05T11:45:00", // 11:45 AM - late morning errand
        image: "https://picsum.photos/200"
      },
      {
        id: "22",
        name: "Train Ticket",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -45.00,
        pending: false,
        category: "Transportation",
        date: "2024-04-04T07:30:00", // 7:30 AM - morning commute
        image: "https://picsum.photos/200"
      },
      {
        id: "23",
        name: "Gift Shop",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -75.50,
        pending: false,
        category: "Shopping",
        date: "2024-04-03T15:30:00", // 3:30 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "24",
        name: "Investment Return",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 250.00,
        pending: false,
        category: "Income",
        date: "2024-04-02T04:00:00", // 4:00 AM - automated process
        image: "https://picsum.photos/200"
      },
      {
        id: "25",
        name: "Concert Tickets",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -150.00,
        pending: false,
        category: "Entertainment",
        date: "2024-04-01T10:00:00", // 10:00 AM - ticket purchase
        image: "https://picsum.photos/200"
      },
      {
        id: "26",
        name: "Home Insurance",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -200.00,
        pending: false,
        category: "Insurance",
        date: "2024-03-31T00:01:00", // 12:01 AM - automated payment
        image: "https://picsum.photos/200"
      },
      {
        id: "27",
        name: "Electronics Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -450.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-30T13:45:00", // 1:45 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "28",
        name: "Consulting Fee",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 750.00,
        pending: false,
        category: "Income",
        date: "2024-03-29T09:30:00", // 9:30 AM - business hours payment
        image: "https://picsum.photos/200"
      },
      {
        id: "29",
        name: "Doctor Visit",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -100.00,
        pending: false,
        category: "Healthcare",
        date: "2024-03-28T10:15:00", // 10:15 AM - morning appointment
        image: "https://picsum.photos/200"
      },
      {
        id: "30",
        name: "Bus Pass",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -60.00,
        pending: false,
        category: "Transportation",
        date: "2024-03-27T08:00:00", // 8:00 AM - morning commute
        image: "https://picsum.photos/200"
      },
      {
        id: "31",
        name: "Furniture Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -350.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-26T14:20:00", // 2:20 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "32",
        name: "Stock Dividend",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 150.00,
        pending: false,
        category: "Income",
        date: "2024-03-25T05:00:00", // 5:00 AM - market opening
        image: "https://picsum.photos/200"
      },
      {
        id: "33",
        name: "Theme Park",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -120.00,
        pending: false,
        category: "Entertainment",
        date: "2024-03-24T11:00:00", // 11:00 AM - weekend activity
        image: "https://picsum.photos/200"
      },
      {
        id: "34",
        name: "Life Insurance",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -150.00,
        pending: false,
        category: "Insurance",
        date: "2024-03-23T00:01:00", // 12:01 AM - automated payment
        image: "https://picsum.photos/200"
      },
      {
        id: "35",
        name: "Jewelry Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -250.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-22T16:30:00", // 4:30 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "36",
        name: "Rental Income",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 1200.00,
        pending: false,
        category: "Income",
        date: "2024-03-21T09:00:00", // 9:00 AM - business hours
        image: "https://picsum.photos/200"
      },
      {
        id: "37",
        name: "Optometrist",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -85.00,
        pending: false,
        category: "Healthcare",
        date: "2024-03-20T15:45:00", // 3:45 PM - afternoon appointment
        image: "https://picsum.photos/200"
      },
      {
        id: "38",
        name: "Taxi Ride",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -30.00,
        pending: false,
        category: "Transportation",
        date: "2024-03-19T02:30:00", // 2:30 AM - late night ride
        image: "https://picsum.photos/200"
      },
      {
        id: "39",
        name: "Sporting Goods",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -180.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-18T12:15:00", // 12:15 PM - lunch break shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "40",
        name: "Side Hustle",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 300.00,
        pending: false,
        category: "Income",
        date: "2024-03-17T16:00:00", // 4:00 PM - afternoon payment
        image: "https://picsum.photos/200"
      },
      {
        id: "41",
        name: "Bowling Alley",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -45.00,
        pending: false,
        category: "Entertainment",
        date: "2024-03-16T20:30:00", // 8:30 PM - evening entertainment
        image: "https://picsum.photos/200"
      },
      {
        id: "42",
        name: "Pet Insurance",
        paymentChannel: "direct debit",
        type: "debit",
        accountId: "123",
        amount: -40.00,
        pending: false,
        category: "Insurance",
        date: "2024-03-15T00:01:00", // 12:01 AM - automated payment
        image: "https://picsum.photos/200"
      },
      {
        id: "43",
        name: "Art Supplies",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -65.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-14T14:45:00", // 2:45 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "44",
        name: "Tutoring Income",
        paymentChannel: "direct deposit",
        type: "credit",
        accountId: "123",
        amount: 200.00,
        pending: false,
        category: "Income",
        date: "2024-03-13T18:30:00", // 6:30 PM - evening tutoring
        image: "https://picsum.photos/200"
      },
      {
        id: "45",
        name: "Dental Checkup",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -90.00,
        pending: false,
        category: "Healthcare",
        date: "2024-03-12T11:30:00", // 11:30 AM - late morning appointment
        image: "https://picsum.photos/200"
      },
      {
        id: "46",
        name: "Bike Rental",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -25.00,
        pending: false,
        category: "Transportation",
        date: "2024-03-11T09:15:00", // 9:15 AM - morning activity
        image: "https://picsum.photos/200"
      },
      {
        id: "47",
        name: "Music Store",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -120.00,
        pending: false,
        category: "Shopping",
        date: "2024-03-10T15:20:00", // 3:20 PM - afternoon shopping
        image: "https://picsum.photos/200"
      },
      {
        id: "48",
        name: "Online Course",
        paymentChannel: "online",
        type: "debit",
        accountId: "123",
        amount: -150.00,
        pending: false,
        category: "Education",
        date: "2024-03-09T20:45:00", // 8:45 PM - evening learning
        image: "https://picsum.photos/200"
      },
      {
        id: "49",
        name: "Car Wash",
        paymentChannel: "in store",
        type: "debit",
        accountId: "123",
        amount: -20.00,
        pending: false,
        category: "Transportation",
        date: "2024-03-08T10:30:00", // 10:30 AM - morning errand
        image: "https://picsum.photos/200"
      },
      {
        id: "50",
        name: "Gift Card",
        paymentChannel: "online",
        type: "credit",
        accountId: "123",
        amount: 50.00,
        pending: false,
        category: "Income",
        date: "2024-03-07T13:00:00", // 1:00 PM - afternoon purchase
        image: "https://picsum.photos/200"
      }
    ];

    return parseStringify(mockTransactions);
  } catch (error) {
    console.error("An error occurred while getting the transactions:", error);
    return [];
  }
};