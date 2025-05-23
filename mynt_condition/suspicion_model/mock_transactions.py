transactions = [
    {
        "id": "1",
        "name": "Grocery Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -45.67,
        "pending": False,
        "category": "Food & Drink",
        "date": "2024-04-25T14:30:00",
        "image": "https://picsum.photos/200?category=food",
        "step": 14,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 1000.00,
        "newbalanceOrig": 954.33,
        "nameDest": "M987654321",
        "oldbalanceDest": 5000.00,
        "newbalanceDest": 5045.67,
        "isFraud": None
    },
    {
        "id": "2",
        "name": "Salary Deposit",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 25000.00,
        "pending": False,
        "category": "Income",
        "date": "2024-04-24T06:00:00",
        "image": "https://picsum.photos/200?category=income",
        "step": 6,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 25000.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 954.33,
        "newbalanceDest": 25954.33,
        "isFraud": None
    },
    {
        "id": "3",
        "name": "Netflix Subscription",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -15.99,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-04-23T00:01:00",
        "image": "https://picsum.photos/200?category=entertainment",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25954.33,
        "newbalanceOrig": 25938.34,
        "nameDest": "M123456789",
        "oldbalanceDest": 10000.00,
        "newbalanceDest": 10015.99,
        "isFraud": None
    },
    {
        "id": "4",
        "name": "Gas Station",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -350.20,
        "pending": False,
        "category": "Transportation",
        "date": "2024-04-22T17:45:00",
        "image": "https://picsum.photos/200?category=transportation",
        "step": 17,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25938.34,
        "newbalanceOrig": 25588.14,
        "nameDest": "M234567890",
        "oldbalanceDest": 2000.00,
        "newbalanceDest": 2350.20,
        "isFraud": None
    },
    {
        "id": "5",
        "name": "Restaurant",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -785.50,
        "pending": False,
        "category": "Food & Drink",
        "date": "2024-04-21T19:20:00",
        "image": "https://picsum.photos/200?category=food",
        "step": 19,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25588.14,
        "newbalanceOrig": 24802.64,
        "nameDest": "M345678901",
        "oldbalanceDest": 3000.00,
        "newbalanceDest": 3785.50,
        "isFraud": None
    },
    {
        "id": "6",
        "name": "Amazon Purchase",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -120.75,
        "pending": False,
        "category": "Shopping",
        "date": "2024-04-20T21:15:00",
        "image": "https://picsum.photos/200?category=shopping",
        "step": 21,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25824.64,
        "newbalanceOrig": 25703.89,
        "nameDest": "M456789012",
        "oldbalanceDest": 50000.00,
        "newbalanceDest": 50120.75,
        "isFraud": None
    },
    {
        "id": "7",
        "name": "Interest Payment",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 2.50,
        "pending": False,
        "category": "Income",
        "date": "2024-04-19T03:00:00",
        "image": "https://picsum.photos/200?category=income",
        "step": 3,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 2.50,
        "nameDest": "C123456789",
        "oldbalanceDest": 25703.89,
        "newbalanceDest": 25706.39,
        "isFraud": None
    },
    {
        "id": "8",
        "name": "Gym Membership",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -29.99,
        "pending": False,
        "category": "Health & Fitness",
        "date": "2024-04-18T00:01:00",
        "image": "https://picsum.photos/200?category=fitness",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25706.39,
        "newbalanceOrig": 25676.40,
        "nameDest": "M567890123",
        "oldbalanceDest": 1000.00,
        "newbalanceDest": 1029.99,
        "isFraud": None
    },
    {
        "id": "9",
        "name": "Coffee Shop",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -3000.00,
        "pending": False,
        "category": "Food & Drink",
        "date": "2024-04-17T08:15:00",
        "image": "https://picsum.photos/200?category=food",
        "step": 8,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25676.40,
        "newbalanceOrig": 22676.40,
        "nameDest": "M678901234",
        "oldbalanceDest": 2000.00,
        "newbalanceDest": 5000.00,
        "isFraud": None
    },
    {
        "id": "10",
        "name": "Phone Bill",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -65.00,
        "pending": False,
        "category": "Utilities",
        "date": "2024-04-16T00:01:00",
        "image": "https://picsum.photos/200?category=utilities",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25671.90,
        "newbalanceOrig": 25606.90,
        "nameDest": "M789012345",
        "oldbalanceDest": 3000.00,
        "newbalanceDest": 3065.00,
        "isFraud": None
    },
    {
        "id": "11",
        "name": "Electricity Bill",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -4500.00,
        "pending": False,
        "category": "Utilities",
        "date": "2024-04-15T00:05:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25606.90,
        "newbalanceOrig": 21106.90,
        "nameDest": "M234567890",
        "oldbalanceDest": 8000.00,
        "newbalanceDest": 12500.00,
        "isFraud": None
    },
    {
        "id": "12",
        "name": "Spotify Subscription",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -3800.00,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-04-14T00:01:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 21106.90,
        "newbalanceOrig": 17306.90,
        "nameDest": "M345678901",
        "oldbalanceDest": 9000.00,
        "newbalanceDest": 12800.00,
        "isFraud": None
    },
    {
        "id": "13",
        "name": "Dentist Visit",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -4200.00,
        "pending": False,
        "category": "Healthcare",
        "date": "2024-04-13T14:30:00",
        "image": "https://picsum.photos/200",
        "step": 14,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 17306.90,
        "newbalanceOrig": 13106.90,
        "nameDest": "M456789012",
        "oldbalanceDest": 10000.00,
        "newbalanceDest": 14200.00,
        "isFraud": None
    },
    {
        "id": "14",
        "name": "Uber Ride",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -3500.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-04-12T23:45:00",
        "image": "https://picsum.photos/200",
        "step": 23,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26750.90,
        "newbalanceOrig": 23250.90,
        "nameDest": "M345678901",
        "oldbalanceDest": 9000.00,
        "newbalanceDest": 12500.00,
        "isFraud": None
    },
    {
        "id": "15",
        "name": "Clothing Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -120.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-04-11T13:20:00",
        "image": "https://picsum.photos/200",
        "step": 13,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25606.90,
        "newbalanceOrig": 25486.90,
        "nameDest": "M890123456",
        "oldbalanceDest": 4000.00,
        "newbalanceDest": 4120.00,
        "isFraud": None
    },
    {
        "id": "16",
        "name": "Freelance Payment",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 500.00,
        "pending": False,
        "category": "Income",
        "date": "2024-04-10T15:00:00",
        "image": "https://picsum.photos/200",
        "step": 15,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 500.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 25486.90,
        "newbalanceDest": 25986.90,
        "isFraud": None
    },
    {
        "id": "17",
        "name": "Movie Theater",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -35.00,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-04-09T19:30:00",
        "image": "https://picsum.photos/200",
        "step": 19,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25986.90,
        "newbalanceOrig": 25951.90,
        "nameDest": "M901234567",
        "oldbalanceDest": 5000.00,
        "newbalanceDest": 5035.00,
        "isFraud": None
    },
    {
        "id": "18",
        "name": "Car Insurance",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -120.00,
        "pending": False,
        "category": "Insurance",
        "date": "2024-04-08T00:01:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25951.90,
        "newbalanceOrig": 25831.90,
        "nameDest": "M012345678",
        "oldbalanceDest": 6000.00,
        "newbalanceDest": 6120.00,
        "isFraud": None
    },
    {
        "id": "19",
        "name": "Bookstore",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -45.75,
        "pending": False,
        "category": "Shopping",
        "date": "2024-04-07T16:15:00",
        "image": "https://picsum.photos/200",
        "step": 16,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 25831.90,
        "newbalanceOrig": 25786.15,
        "nameDest": "M123456789",
        "oldbalanceDest": 7000.00,
        "newbalanceDest": 7045.75,
        "isFraud": None
    },
    {
        "id": "20",
        "name": "Bonus Payment",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 1000.00,
        "pending": False,
        "category": "Income",
        "date": "2024-04-06T06:00:00",
        "image": "https://picsum.photos/200",
        "step": 6,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 1000.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 25786.15,
        "newbalanceDest": 26786.15,
        "isFraud": None
    },
    {
        "id": "21",
        "name": "Pharmacy",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -3600.00,
        "pending": False,
        "category": "Healthcare",
        "date": "2024-04-05T11:45:00",
        "image": "https://picsum.photos/200",
        "step": 11,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26786.15,
        "newbalanceOrig": 23186.15,
        "nameDest": "M234567890",
        "oldbalanceDest": 8000.00,
        "newbalanceDest": 11600.00,
        "isFraud": None
    },
    {
        "id": "22",
        "name": "Train Ticket",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -4000.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-04-04T07:30:00",
        "image": "https://picsum.photos/200",
        "step": 7,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26750.90,
        "newbalanceOrig": 22750.90,
        "nameDest": "M345678901",
        "oldbalanceDest": 9000.00,
        "newbalanceDest": 13000.00,
        "isFraud": None
    },
    {
        "id": "23",
        "name": "Gift Shop",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -75.50,
        "pending": False,
        "category": "Shopping",
        "date": "2024-04-03T15:30:00",
        "image": "https://picsum.photos/200",
        "step": 15,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26705.90,
        "newbalanceOrig": 26630.40,
        "nameDest": "M456789012",
        "oldbalanceDest": 10000.00,
        "newbalanceDest": 10075.50,
        "isFraud": None
    },
    {
        "id": "24",
        "name": "Investment Return",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 250.00,
        "pending": False,
        "category": "Income",
        "date": "2024-04-02T04:00:00",
        "image": "https://picsum.photos/200",
        "step": 4,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 250.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 26630.40,
        "newbalanceDest": 26880.40,
        "isFraud": None
    },
    {
        "id": "25",
        "name": "Concert Tickets",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -150.00,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-04-01T10:00:00",
        "image": "https://picsum.photos/200",
        "step": 10,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26880.40,
        "newbalanceOrig": 26730.40,
        "nameDest": "M567890123",
        "oldbalanceDest": 11000.00,
        "newbalanceDest": 11150.00,
        "isFraud": None
    },
    {
        "id": "26",
        "name": "Home Insurance",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -200.00,
        "pending": False,
        "category": "Insurance",
        "date": "2024-03-31T00:01:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26730.40,
        "newbalanceOrig": 26530.40,
        "nameDest": "M678901234",
        "oldbalanceDest": 12000.00,
        "newbalanceDest": 12200.00,
        "isFraud": None
    },
    {
        "id": "27",
        "name": "Electronics Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -450.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-30T13:45:00",
        "image": "https://picsum.photos/200",
        "step": 13,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26530.40,
        "newbalanceOrig": 26080.40,
        "nameDest": "M789012345",
        "oldbalanceDest": 13000.00,
        "newbalanceDest": 13450.00,
        "isFraud": None
    },
    {
        "id": "28",
        "name": "Consulting Fee",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 750.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-29T09:30:00",
        "image": "https://picsum.photos/200",
        "step": 9,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 750.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 26080.40,
        "newbalanceDest": 26830.40,
        "isFraud": None
    },
    {
        "id": "29",
        "name": "Doctor Visit",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -100.00,
        "pending": False,
        "category": "Healthcare",
        "date": "2024-03-28T10:15:00",
        "image": "https://picsum.photos/200",
        "step": 10,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26830.40,
        "newbalanceOrig": 26730.40,
        "nameDest": "M890123456",
        "oldbalanceDest": 14000.00,
        "newbalanceDest": 14100.00,
        "isFraud": None
    },
    {
        "id": "30",
        "name": "Bus Pass",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -60.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-03-27T08:00:00",
        "image": "https://picsum.photos/200",
        "step": 8,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26730.40,
        "newbalanceOrig": 26670.40,
        "nameDest": "M901234567",
        "oldbalanceDest": 15000.00,
        "newbalanceDest": 15060.00,
        "isFraud": None
    },
    {
        "id": "31",
        "name": "Furniture Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -350.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-26T14:20:00",
        "image": "https://picsum.photos/200",
        "step": 14,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26670.40,
        "newbalanceOrig": 26320.40,
        "nameDest": "M012345678",
        "oldbalanceDest": 16000.00,
        "newbalanceDest": 16350.00,
        "isFraud": None
    },
    {
        "id": "32",
        "name": "Stock Dividend",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 150.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-25T05:00:00",
        "image": "https://picsum.photos/200",
        "step": 5,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 150.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 26320.40,
        "newbalanceDest": 26470.40,
        "isFraud": None
    },
    {
        "id": "33",
        "name": "Theme Park",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -120.00,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-03-24T11:00:00",
        "image": "https://picsum.photos/200",
        "step": 11,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26470.40,
        "newbalanceOrig": 26350.40,
        "nameDest": "M123456789",
        "oldbalanceDest": 17000.00,
        "newbalanceDest": 17120.00,
        "isFraud": None
    },
    {
        "id": "34",
        "name": "Life Insurance",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -150.00,
        "pending": False,
        "category": "Insurance",
        "date": "2024-03-23T00:01:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26350.40,
        "newbalanceOrig": 26200.40,
        "nameDest": "M234567890",
        "oldbalanceDest": 18000.00,
        "newbalanceDest": 18150.00,
        "isFraud": None
    },
    {
        "id": "35",
        "name": "Jewelry Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -250.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-22T16:30:00",
        "image": "https://picsum.photos/200",
        "step": 16,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26200.40,
        "newbalanceOrig": 25950.40,
        "nameDest": "M345678901",
        "oldbalanceDest": 19000.00,
        "newbalanceDest": 19250.00,
        "isFraud": None
    },
    {
        "id": "36",
        "name": "Rental Income",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 1200.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-21T09:00:00",
        "image": "https://picsum.photos/200",
        "step": 9,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 1200.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 25950.40,
        "newbalanceDest": 27150.40,
        "isFraud": None
    },
    {
        "id": "37",
        "name": "Optometrist",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -85.00,
        "pending": False,
        "category": "Healthcare",
        "date": "2024-03-20T15:45:00",
        "image": "https://picsum.photos/200",
        "step": 15,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27150.40,
        "newbalanceOrig": 27065.40,
        "nameDest": "M456789012",
        "oldbalanceDest": 20000.00,
        "newbalanceDest": 20085.00,
        "isFraud": None
    },
    {
        "id": "38",
        "name": "Taxi Ride",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -2500.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-03-19T02:30:00",
        "image": "https://picsum.photos/200",
        "step": 2,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27065.40,
        "newbalanceOrig": 24565.40,
        "nameDest": "M567890123",
        "oldbalanceDest": 21000.00,
        "newbalanceDest": 23500.00,
        "isFraud": None
    },
    {
        "id": "39",
        "name": "Sporting Goods",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -180.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-18T12:15:00",
        "image": "https://picsum.photos/200",
        "step": 12,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27035.40,
        "newbalanceOrig": 26855.40,
        "nameDest": "M678901234",
        "oldbalanceDest": 22000.00,
        "newbalanceDest": 22180.00,
        "isFraud": None
    },
    {
        "id": "40",
        "name": "Side Hustle",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 300.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-17T16:00:00",
        "image": "https://picsum.photos/200",
        "step": 16,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 300.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 26855.40,
        "newbalanceDest": 27155.40,
        "isFraud": None
    },
    {
        "id": "41",
        "name": "Bowling Alley",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -45.00,
        "pending": False,
        "category": "Entertainment",
        "date": "2024-03-16T20:30:00",
        "image": "https://picsum.photos/200",
        "step": 20,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27155.40,
        "newbalanceOrig": 27110.40,
        "nameDest": "M789012345",
        "oldbalanceDest": 23000.00,
        "newbalanceDest": 23045.00,
        "isFraud": None
    },
    {
        "id": "42",
        "name": "Pet Insurance",
        "paymentChannel": "direct debit",
        "type": "debit",
        "accountId": "123",
        "amount": -40.00,
        "pending": False,
        "category": "Insurance",
        "date": "2024-03-15T00:01:00",
        "image": "https://picsum.photos/200",
        "step": 24,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27110.40,
        "newbalanceOrig": 27070.40,
        "nameDest": "M890123456",
        "oldbalanceDest": 24000.00,
        "newbalanceDest": 24040.00,
        "isFraud": None
    },
    {
        "id": "43",
        "name": "Art Supplies",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -65.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-14T14:45:00",
        "image": "https://picsum.photos/200",
        "step": 14,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27070.40,
        "newbalanceOrig": 27005.40,
        "nameDest": "M901234567",
        "oldbalanceDest": 25000.00,
        "newbalanceDest": 25065.00,
        "isFraud": None
    },
    {
        "id": "44",
        "name": "Tutoring Income",
        "paymentChannel": "direct deposit",
        "type": "credit",
        "accountId": "123",
        "amount": 200.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-13T18:30:00",
        "image": "https://picsum.photos/200",
        "step": 18,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 200.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 27005.40,
        "newbalanceDest": 27205.40,
        "isFraud": None
    },
    {
        "id": "45",
        "name": "Dental Checkup",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -90.00,
        "pending": False,
        "category": "Healthcare",
        "date": "2024-03-12T11:30:00",
        "image": "https://picsum.photos/200",
        "step": 11,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27205.40,
        "newbalanceOrig": 27115.40,
        "nameDest": "M012345678",
        "oldbalanceDest": 26000.00,
        "newbalanceDest": 26090.00,
        "isFraud": None
    },
    {
        "id": "46",
        "name": "Bike Rental",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -3200.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-03-11T09:15:00",
        "image": "https://picsum.photos/200",
        "step": 9,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27115.40,
        "newbalanceOrig": 23915.40,
        "nameDest": "M123456789",
        "oldbalanceDest": 27000.00,
        "newbalanceDest": 30200.00,
        "isFraud": None
    },
    {
        "id": "47",
        "name": "Music Store",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -120.00,
        "pending": False,
        "category": "Shopping",
        "date": "2024-03-10T15:20:00",
        "image": "https://picsum.photos/200",
        "step": 15,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 27090.40,
        "newbalanceOrig": 26970.40,
        "nameDest": "M234567890",
        "oldbalanceDest": 28000.00,
        "newbalanceDest": 28120.00,
        "isFraud": None
    },
    {
        "id": "48",
        "name": "Online Course",
        "paymentChannel": "online",
        "type": "debit",
        "accountId": "123",
        "amount": -150.00,
        "pending": False,
        "category": "Education",
        "date": "2024-03-09T20:45:00",
        "image": "https://picsum.photos/200",
        "step": 20,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26970.40,
        "newbalanceOrig": 26820.40,
        "nameDest": "M345678901",
        "oldbalanceDest": 29000.00,
        "newbalanceDest": 29150.00,
        "isFraud": None
    },
    {
        "id": "49",
        "name": "Car Wash",
        "paymentChannel": "in store",
        "type": "debit",
        "accountId": "123",
        "amount": -2800.00,
        "pending": False,
        "category": "Transportation",
        "date": "2024-03-08T10:30:00",
        "image": "https://picsum.photos/200",
        "step": 10,
        "nameOrig": "C123456789",
        "oldbalanceOrg": 26820.40,
        "newbalanceOrig": 24020.40,
        "nameDest": "M456789012",
        "oldbalanceDest": 30000.00,
        "newbalanceDest": 32800.00,
        "isFraud": None
    },
    {
        "id": "50",
        "name": "Gift Card",
        "paymentChannel": "online",
        "type": "credit",
        "accountId": "123",
        "amount": 50.00,
        "pending": False,
        "category": "Income",
        "date": "2024-03-07T13:00:00",
        "image": "https://picsum.photos/200",
        "step": 13,
        "nameOrig": "C987654321",
        "oldbalanceOrg": 0.00,
        "newbalanceOrig": 50.00,
        "nameDest": "C123456789",
        "oldbalanceDest": 26800.40,
        "newbalanceDest": 26850.40,
        "isFraud": None
    }
] 