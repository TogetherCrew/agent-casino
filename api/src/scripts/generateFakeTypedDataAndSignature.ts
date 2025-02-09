/**
 * generateFakeTypedDataSignature.ts
 *
 * Usage:
 *   npm install viem tsx
 *   npx tsx generateFakeTypedDataSignature.ts
 *
 * What it does:
 *   1. Creates a "Withdraw" typed-data object (EIP-712).
 *   2. Signs it using a dummy private key (test only).
 *   3. Prints out the typedData JSON (with bigints as strings), the signature, & the signer address.
 */

import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as chains from 'viem/chains'

import { SupportedChainId } from '../shared/types/chain.type'

/**
 * If you want strong typing for your typedData, define an interface.
 * Notice "primaryType" is literally `'Withdraw'`.
 */
interface WithdrawTypedData {
    domain: {
        name: string
        version: string
        chainId?: number
        verifyingContract?: `0x${string}`
    }
    types: {
        Withdraw: { name: string; type: string }[]
    }
    primaryType: 'Withdraw'
    message: {
        agentId: number
        amount: bigint
        expireAt: number
    }
}

// 1) Dummy Private Key: DO NOT use in production
const DUMMY_PRIVATE_KEY =
    '0x4cfe0fbe8761b5ce844ee5cf8344bd323e0430b62c6025a537a28e6283092f2f'

// Convert the private key into an "Account" object that viem can use
const account = privateKeyToAccount(DUMMY_PRIVATE_KEY)

/**
 * 2) Create a viem WalletClient.
 *    - "transport: http()" can point to any JSON-RPC endpoint.
 *    - For purely off-chain signing, a real chain isn't strictly needed.
 */

// Example if you want to map chainId=84532 to a chain config:
function idToChain(chainId: SupportedChainId) {
    for (const chain of Object.values(chains)) {
        // Each chain in 'viem/chains' might or might not have 'id'
        if ('id' in chain) {
            if (chain.id === chainId) {
                return chain
            }
        }
    }
    return undefined // fallback if not found
}

const selectedChain = idToChain(84532)

const walletClient = createWalletClient({
    chain: selectedChain, // could be undefined if not found
    transport: http(),
    account,
})

async function main() {
    // 3) Define your EIP-712 typed data object
    const typedData: WithdrawTypedData = {
        domain: {
            name: 'agent-casino',
            version: '1',
            // chainId: 84532, // optionally
            // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        types: {
            Withdraw: [
                { name: 'agentId', type: 'uint256' },
                { name: 'amount', type: 'uint256' },
                { name: 'expireAt', type: 'uint256' },
            ],
        },
        primaryType: 'Withdraw',
        message: {
            agentId: 14,
            amount: 30000000000000n, // e.g. "0.01 ETH" in wei if you interpret it that way
            expireAt: 1767097847, // Some future timestamp
        },
    }

    // 4) Sign the typedData with our dummy private key
    //    If TS complains about "Property 'account' is missing...", pass it explicitly:
    const signature = await walletClient.signTypedData({
        account, // some versions of viem want this explicitly
        domain: typedData.domain,
        types: typedData.types,
        primaryType: typedData.primaryType,
        message: typedData.message,
    })

    /**
     * 5) Convert the typedData object to a JSON string
     *    If you do `JSON.stringify(typedData)` directly, it throws
     *    "Do not know how to serialize a BigInt".
     *    So we use a replacer that converts bigints to strings.
     */
    const typedDataJson = JSON.stringify(typedData, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    )

    // 6) Output the test data to console
    console.log('Typed Data JSON:\n', typedDataJson)
    console.log('\nSignature:\n', signature)
    console.log('\nSigner address:\n', account.address)

    /**
     * If you "just need the message and signature," these two console.logs are enough:
     *
     * console.log('MESSAGE =>', typedDataJson)
     * console.log('SIGNATURE =>', signature)
     *
     * That's what you'd use in your API calls:
     *   POST /mpc-wallet/84532/agentId/withdraw
     *   {
     *       "message": typedDataJson,
     *       "signature": signature
     *   }
     */
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
