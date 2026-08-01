# Decentralized Academic Ledger

A Blockchain-Based Credential Verification System for Nigerian Tertiary Institutions.

## Overview

The credibility of educational systems and labor markets is often undermined by the systemic issue of certificate forgery. This project addresses this systemic trust deficit by providing an automated, immutable credential verification system built on blockchain technology. The solution focuses on replacing traditional paper-based and centralized digital records with a trustless, decentralized ledger. 

By treating academic degrees as cryptographic assets, this DApp allows institutions to securely issue certificates and enables employers to verify them instantaneously, completely eliminating the possibility of retroactive alteration or forgery.

## Technology Stack & Pivots

The project leverages a modern Web3 stack:
- **Smart Contracts:** Solidity, Foundry
- **Web3 Integration:** wagmi, viem, RainbowKit
- **Frontend:** Next.js (React), Tailwind CSS, shadcn/ui
- **Decentralized Storage:** IPFS (via Pinata)

### Rationale for Tech Stack Pivots
*Note: This project pivoted from an initial proposed stack of Hardhat and ethers.js to the stack listed above. Below is the rationale:*

1. **Foundry over Hardhat:** Foundry (written in Rust) provides blazingly fast compilation and testing. Furthermore, it allows smart contract testing to be written directly in Solidity, giving contract engineers a more native, intuitive testing environment without needing to pivot to JavaScript/TypeScript. It also comes out-of-the-box with powerful fuzz-testing capabilities.
2. **wagmi + viem over ethers.js:** Wagmi provides robust, optimized React hooks specifically designed for modern React/Next.js architectures, avoiding the boilerplate of managing Web3 state manually. Viem serves as a highly performant, lightweight alternative to ethers.js for interacting with the blockchain. Together with RainbowKit, this stack offers a superior developer and user experience.

## System Architecture

- **The National Universities Commission (NUC)** acts as the supreme administrator. Only the NUC can authorize or remove Universities as "Issuers" on the network.
- **Universities (Issuers)** are responsible for minting credentials. The metadata of a graduate's certificate is uploaded to IPFS, and the resulting cryptographic hash (CID) is recorded on the blockchain.
- **Employers (Verifiers)** can instantly verify the authenticity and status of a credential through the public portal without needing to trust any centralized database.
- **Revocation:** The system supports credential revocation to handle edge cases such as academic misconduct or administrative errors.

---

## Comprehensive Usage Guide: From Start to Finish

Follow this step-by-step guide to run, deploy, and interact with the Decentralized Academic Ledger locally.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (Forge, Anvil, Cast)
- A Web3 Wallet extension (e.g., [MetaMask](https://metamask.io/)) installed in your browser.
- (Optional but recommended) A [Pinata](https://pinata.cloud/) API Key for IPFS storage.

### 2. Local Blockchain & Smart Contract Deployment
To interact with the DApp locally, you need to spin up a local Ethereum node and deploy the smart contract.

**Terminal 1: Start Anvil**
```bash
cd contracts
anvil
```
*Note: Anvil will provide you with 10 test accounts with 10,000 ETH each. Import at least two of these private keys into your MetaMask wallet (Account 1 will act as the NUC Admin, Account 2 will act as the University Issuer).*

**Terminal 2: Deploy the Contract**
Deploy the contract using the first Anvil private key (this makes Account 1 the NUC Admin).
```bash
cd contracts
forge create src/CredentialLedger.sol:CredentialLedger \
  --rpc-url http://127.0.0.1:8545 \
  --private-key <ANVIL_PRIVATE_KEY_0>
```
*Save the **Deployed to:** address output by this command.*

### 3. Frontend Setup
Configure the frontend to talk to your freshly deployed local contract.

1. **Update the Contract Address:**
   Open `frontend/src/app/admin/page.tsx` and update the `CONTRACT_ADDRESS` constant to the address you just deployed:
   ```typescript
   export const CONTRACT_ADDRESS = '0xYourDeployedContractAddress...';
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the `frontend` directory and add your Pinata JWT (if you don't have one, the app will gracefully fall back to generating a mock IPFS CID for testing purposes).
   ```env
   PINATA_JWT=your_pinata_jwt_token_here
   ```

3. **Install Dependencies & Run:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

---

### 4. Step-by-Step DApp Walkthrough

Now that the app is running, open it in your browser and follow this user journey:

#### Step 1: Whitelist a University (NUC Admin Portal)
1. Ensure your MetaMask is connected to the **Localhost 8545** (Foundry) network.
2. Select **Account 1** (the deployer/Admin) in MetaMask.
3. Click **Connect Wallet** in the top right corner of the DApp.
4. Navigate to the **NUC Admin** tab (`/admin`).
5. Copy the Ethereum address of your **Account 2** (the University) from MetaMask.
6. Paste the address into the input field and click **Add Issuer**.
7. Confirm the transaction in MetaMask. *Account 2 is now an authorized university.*

#### Step 2: Issue a Credential (University Portal)
1. Switch your active MetaMask account to **Account 2** (the authorized university).
2. Navigate to the **University Issuer** tab (`/issuer`).
3. Fill out the Graduate's details:
   - *Full Name:* John Doe
   - *Matriculation No:* U18/CS/1000
   - *Degree Program:* B.Sc. Computer Science
   - *Class of Degree:* First Class Honours
   - *Year of Graduation:* 2024
4. Click **Issue Credential**. 
   - *Under the hood, this uploads the JSON data to IPFS (via Pinata) and receives a CID.*
   - *It then cryptographically hashes the Matriculation Number + Degree Program to create a unique Credential Hash (ID).*
5. Confirm the transaction in MetaMask to mint the credential to the blockchain.
6. Wait for the green success message. **IMPORTANT:** Open your browser's developer console (F12) or check the Next.js terminal to see the generated `Credential ID (Hash)`. Copy this hash for the next step.

#### Step 3: Verify a Credential (Public Portal)
1. Anyone (e.g., an employer) can perform this step; wallet connection is optional.
2. Navigate to the **Verify Credential** tab (`/verify`).
3. Paste the **Credential ID (Hash)** generated in the previous step into the input field.
4. Click **Verify**.
5. The DApp queries the blockchain. If valid, you will see a green **Valid Credential** badge. 
6. The DApp will automatically fetch the metadata from IPFS and display the original JSON (Name, Degree, Class) directly on the screen, mathematically proving the authenticity of the degree!
