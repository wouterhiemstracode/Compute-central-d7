# Compute Credit Marketplace

A prototype exploring a simple idea:

> What if expiring compute credits could be reallocated instead of lost?

---

## The problem

Many startups receive large amounts of cloud credits (AWS, Google Cloud, Azure).

These credits:

- expire over time  
- are locked to specific providers  
- often go underutilized  

At the same time, other startups are actively spending cash on compute.

This creates a clear inefficiency:

> some companies are losing compute value, while others are paying full price for it.

---

## The idea

This project explores a system where:

- companies with expiring credits can “sell” them at a discount  
- companies with compute demand can use that capacity at a lower cost  
- a platform sits in between and allocates usage  

Instead of transferring credits directly (which isn’t supported today), the system simulates:

> reallocating compute usage from one company to another

---

## What this prototype does

This dashboard combines three layers:

### 1. Credit tracking
- tracks compute credits across providers  
- highlights expiration timelines  
- identifies value at risk  

---

### 2. Recovery & efficiency
- shows how much compute is used vs lost  
- calculates **recovered value** (credits used before expiry)  
- surfaces projected losses  

Example:

> “You are projected to lose $12,400 in credits over the next 90 days.”

---

### 3. Marketplace simulation
- models a supply side (expiring credits)  
- models a demand side (companies needing compute)  
- simulates matching between the two  

This allows:

- suppliers to recover value from credits that would otherwise expire  
- buyers to access discounted compute  
- the platform to capture a small fee  

---

## Key concept: Value recovery

Recovered compute represents credits that would have expired, but were instead used productively.

Example:

- $50k credits received  
- $20k used internally  
- $15k allocated to others  
- $15k would have expired  

→ $15k in value recovered  

---

## Why this matters

Today, the flow looks like:

1. Cash → compute  
2. Compute is partially used  
3. Unused credits expire  

At the same time:

1. Another company spends cash → compute  

This project explores a more efficient system:

> keeping value inside the compute layer instead of letting it expire.

---

## Important note

Cloud providers (AWS, GCP, Azure) currently:

- do not allow transfer of credits  
- design credits to be non-transferable  

This prototype does NOT implement real transfers.

Instead, it simulates how compute usage could be reallocated across companies.

---

## Open questions

- How much compute value is currently wasted across startups?  
- Would companies sell expiring credits at a discount?  
- Would others rely on third-party compute allocation?  
- How would trust and execution work in practice?  
- Would cloud providers ever support or restrict this further?  

---

## What this is not

- Not a crypto or token system  
- Not a real payments platform  
- Not integrated with cloud providers  

This is a lightweight prototype to explore a real inefficiency.

---

## Running locally

```bash
npm install
npm run dev
