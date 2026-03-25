# Compute as a Medium of Exchange

This is a simple prototype exploring a question:

> What happens if compute becomes a resource companies transact with — not just consume?

---

## The idea

AI companies today are increasingly compute-heavy.

At the same time, many startups sit on large amounts of cloud credits (AWS, Google Cloud, Azure). These credits are:

- non-transferable  
- tied to a single provider  
- expiring over time  

Meanwhile, those same companies are paying vendors, tools, and contractors in cash — which is often their scarcest resource.

This creates a mismatch:

> companies are rich in compute, but transact in cash.

---

## What this prototype does

This dashboard simulates a world where compute is treated as a usable economic resource.

It includes:

- **Real compute usage tracking** (via OpenAI API usage)
- **Simulated multi-cloud credits** (AWS, GCP, Azure)
- A simple **“pay with compute” flow**
- **Transaction history** for compute-based payments

The goal is not to build infrastructure, but to make the idea tangible.

---

## Demo

_(add screenshots or a Loom here)_

---

## How it works

### 1. Compute tracking
Tracks API usage and translates it into cost over time.

### 2. Credit layer (simulated)
Represents cloud credits as balances with:

- expiration timelines  
- remaining value  
- burn rate  

### 3. Transactions (simulated)
Allows sending “compute” to another company by deducting credits.

---

## Why this matters

Right now, the flow looks like:

1. A company converts cash → compute  
2. Builds a product  
3. Charges another company in cash  
4. That company converts cash → compute again  

Value leaves the infrastructure layer and then returns to it.

This prototype explores a simpler model:

> What if value stayed inside the compute layer?

---

## Open questions

This project is mainly a conversation starter.

Some questions that come up:

- Would companies actually accept compute as payment?  
- How would pricing work across different providers?  
- Who intermediates trust between companies?  
- Would cloud providers ever allow this?  
- Does this reduce friction enough to matter?  

---

## What this is not

- Not a crypto project  
- Not a real payments system  
- Not integrated with cloud providers  

It’s a lightweight prototype to explore a direction.

---

## Running locally

```bash
npm install
npm run dev

