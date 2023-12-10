# API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`

Routes below need authentication

- `GET /account`
- `POST /transaction/transfer`
- `POST /transaction/payment`
- `GET /report`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
"access_token"
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password cannot empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 2. GET /account

Description:

- Get current user account details

Request:
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
  "accountNo": "9599211230",
  "CustomerId": "f9ac35a3-11a0-4f88-b383-d452a03bdd5d",
  "accountType": "Korporasi",
  "accountStatus": "active",
  "balance": "393492500",
  "createdAt": "2023-12-08T23:48:23.754Z",
  "updatedAt": "2023-12-10T22:27:53.215Z",
  "Customer": {
    "id": "f9ac35a3-11a0-4f88-b383-d452a03bdd5d",
    "firstName": "PT ABC",
    "lastName": "",
    "email": "abc@mail.com",
    "address": "Jalan Bunga Indah No. 123"
  }
}

```

&nbsp;

## 3. POST /transaction/transfer

Description:

- Post a transaction 

Request:
- headers:

```json
{
  "access_token": "string"
}
```
- body:

```json
{
  "toAccountNo": "string",
  "amount": "number",
  "PIN": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "e151ba66-5562-4302-9cce-f5dccec65744",
  "AccountId": "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
  "transactionType": "Debet",
  "transactionDetail": "Transfer Keluar",
  "fromAccountNo": "9599211230",
  "toAccountNo": "24772247",
  "amount": "1000000",
  "currency": "IDR",
  "updatedAt": "2023-12-10T23:26:10.971Z",
  "createdAt": "2023-12-10T23:26:10.971Z",
  "destinationBankCode": null,
  "fee": null
}

```

&nbsp;
## 4. POST /transaction/payment

Description:

- Post a electril bill payment 

Request:
- headers:

```json
{
  "access_token": "string"
}
```
- body:

```json
{
  "PIN": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Payment Success",
  "transaction": [
    {
      "id": "739f3076-40e0-41b4-9f2e-3036a7a67958",
      "AccountId": "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
      "transactionType": "Debet",
      "transactionDetail": "Pembayaran Listrik",
      "fromAccountNo": "9599211230",
      "toAccountNo": "PLN",
      "amount": "5000000",
      "currency": "IDR",
      "updatedAt": "2023-12-10T23:31:46.308Z",
      "createdAt": "2023-12-10T23:31:46.308Z",
      "destinationBankCode": null,
      "fee": null
    },
    {
      "id": "948a75b7-6765-4620-87e9-53de89179b5b",
      "AccountId": "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
      "transactionType": "Debet",
      "transactionDetail": "Biaya Admin",
      "fromAccountNo": "9599211230",
      "toAccountNo": "PLN",
      "amount": "7500",
      "currency": "IDR",
      "updatedAt": "2023-12-10T23:31:46.316Z",
      "createdAt": "2023-12-10T23:31:46.316Z",
      "destinationBankCode": null,
      "fee": null
    }
  ]
}

```
&nbsp;

## 5. GET /report

Description:

- Get current user account details

Request:
- headers:

```json
{
  "access_token": "string"
}
```

- query : 
```json
{
  "startDate": "string",
  "endDate": "string"
}
```

_Response (200 - OK)_

```json
{
  "accountNo": "9599211230",
  "accountName": "PT ABC ",
  "periode": "11-12-2023 - 12-12-2023",
  "tanggalInquiry": "2023-12-10T23:34:29.836Z",
  "openingBalance": 393492500,
  "endingBalance": 373462500,
  "report": [
    ...,
    {
      "id": "e151ba66-5562-4302-9cce-f5dccec65744",
      "AccountId": "a9ac35a3-11a0-4f88-b383-d452a03bdd5d",
      "transactionType": "Debet",
      "transactionDetail": "Transfer Keluar",
      "fromAccountNo": "9599211230",
      "toAccountNo": "24772247",
      "amount": "7500",
      "currency": "IDR",
      "destinationBankCode": null,
      "fee": null,
      "createdAt": "2023-12-10T23:26:10.971Z",
      "updatedAt": "2023-12-10T23:26:10.971Z"
    },
    ...
  ]
}

```

&nbsp;
## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```
