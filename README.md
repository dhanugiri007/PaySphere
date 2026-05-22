# PaySphere 💸

A digital wallet backend with a double-entry ledger system, atomic transactions, and idempotency support — built with Node.js, Express, and MongoDB.


## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB + Mongoose
- **Auth** — JWT + Cookies
- **Email** — Nodemailer

## Features

- User registration and login with JWT authentication
- Create wallet accounts
- Deposit money into accounts
- Transfer money between accounts atomically
- Idempotency keys to prevent duplicate transactions
- Transaction history
- Balance tracking via double-entry ledger system
- Token blacklisting on logout

## Architecture

```
├── server.js           # Entry point, starts server
├── src/
│   ├── app.js          # Express app, middleware setup, route mounting
│   ├── config/
│   │   └── db.js       # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js         # Register, login, logout logic
│   │   ├── account.controller.js      # Create account, deposit, balance, history
│   │   └── transaction.controller.js  # Transfer money between accounts
│   ├── middlewares/
│   │   └── auth.middleware.js         # JWT verification, blacklist check
│   ├── models/
│   │   ├── user.model.js              # User schema, password hashing
│   │   ├── account.model.js           # Account schema, getBalance method
│   │   ├── transaction.model.js       # Transaction schema
│   │   ├── ledger.model.js            # Ledger schema, immutable entries
│   │   └── blacklist.model.js         # Blacklisted JWT tokens
│   ├── routes/
│   │   ├── auth.route.js              # Auth routes
│   │   ├── account.route.js           # Account routes
│   │   └── transaction.route.js       # Transaction routes
│   └── services/
│       └── email.service.js           # Nodemailer email sending
```


## How Money Works (Ledger System)

Instead of storing balance directly on the account, PaySphere uses a
**double-entry ledger system** — the same pattern used by real fintech companies.

Every transaction creates two ledger entries:
- A DEBIT entry on the sender's account
- A CREDIT entry on the receiver's account

Balance is calculated by: Balance = Total CREDITS - Total DEBITS

This means:
- Balance history is always auditable
- No balance can go missing
- Ledger entries are immutable — they can never be edited or deleted
- MongoDB sessions ensure both entries are created atomically —
  either both succeed or both fail, money never disappears mid-transaction

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repo
```bash
git clone https://github.com/dhanugiri007/PaySphere.git
cd PaySphere
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
EMAIL_USER=your_email
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REFRESH_TOKEN=your_refresh_token

4. Run the server
```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/auth/logout | Logout user | Yes |

### Account
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /api/account/ | Create a new account | Yes |
| POST | /api/account/deposit | Deposit money | Yes |
| GET | /api/account/balance | Get current balance | Yes |
| GET | /api/account/transactions | Get transaction history | Yes |

### Transaction
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | /api/transaction/ | Transfer money between accounts | Yes |

## API Usage Examples

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Create Account
```json
POST /api/account/
// No body required, uses logged in user
```

### Deposit
```json
POST /api/account/deposit
{
  "accountId": "your_account_id",
  "amount": 5000
}
```

### Transfer
```json
POST /api/transaction/
{
  "fromAccount": "account1_id",
  "toAccount": "account2_id",
  "amount": 500,
  "idempotencyKey": "unique-uuid-here"
}
```

### Get Balance
```json
GET /api/account/balance
// No body required
```

### Get Transaction History
```json
GET /api/account/transactions
// No body required
```

### Logout
```json
POST /api/auth/logout
// No body required
```

## LIVE API
https://paysphere-ih0s.onrender.com/

