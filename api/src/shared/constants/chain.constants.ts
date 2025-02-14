export const SUPPORTED_CHAINS = [84532, 8453]

export const CHAINS = {
    84532: {
        HTTPRpcURL: 'https://sepolia.base.org',
        WsRpcURL: 'wss://base-sepolia-rpc.publicnode.com',
    },
    8453: {
        HTTPRpcURL: 'https://mainnet.base.org',
        WsRpcURL: 'wss://base-rpc.publicnode.com',
    },
}
export const AGENT_FACTORY_CONTRACT = {
    84532: {
        address: '0x823aDd76b190b27F5C5F0a9aD07d845f55f540AB',
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_gameMaster',
                        type: 'address',
                    },
                    { internalType: 'address', name: '_ens', type: 'address' },
                ],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'ERC721IncorrectOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ERC721InsufficientApproval',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'approver',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidApprover',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidOperator',
                type: 'error',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'ERC721InvalidOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidReceiver',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidSender',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ERC721NonexistentToken',
                type: 'error',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'OwnableInvalidOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'OwnableUnauthorizedAccount',
                type: 'error',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                name: 'AGNTUnstaked',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'agentWallet',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'bio',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'character',
                        type: 'string',
                    },
                ],
                name: 'AgentCreated',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'approved',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Approval',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'bool',
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                name: 'ApprovalForAll',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'AttributesMinted',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'newBio',
                        type: 'string',
                    },
                ],
                name: 'BioUpdated',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'oldGameMaster',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'newGameMaster',
                        type: 'address',
                    },
                ],
                name: 'GameMasterChanged',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: 'bool',
                        name: 'gameStarted',
                        type: 'bool',
                    },
                ],
                name: 'GameStateChanged',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'previousOwner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'OwnershipTransferred',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'TokensDeposited',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'fromAgentId',
                        type: 'uint256',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'toAgentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'TokensTransferred',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                ],
                name: 'TokensWithdrawn',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Transfer',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'newWalletId',
                        type: 'string',
                    },
                ],
                name: 'WalletIdUpdated',
                type: 'event',
            },
            {
                inputs: [],
                name: 'MINIMUM_STAKE',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: '_ownerAgents',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: '_tokenIdCounter',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentIntBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentStrBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentVitBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentWallets',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'agntToken',
                outputs: [
                    {
                        internalType: 'contract IERC20',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'balanceOf',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'stakeAmount',
                        type: 'uint256',
                    },
                ],
                name: 'calculateMintableAttributes',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'bio', type: 'string' },
                    {
                        internalType: 'string',
                        name: 'character',
                        type: 'string',
                    },
                ],
                name: 'createAgent',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'depositTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'ens',
                outputs: [
                    { internalType: 'contract ENS', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'gameMaster',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'gameStarted',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                ],
                name: 'getAgentTokenBalances',
                outputs: [
                    { internalType: 'uint256', name: 'str', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'intelligence',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitality',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'getAgentsByOwner',
                outputs: [
                    { internalType: 'uint256[]', name: '', type: 'uint256[]' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'getApproved',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'intToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'isApprovedForAll',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'stakeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'mintAttributes',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'name',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'owner',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ownerOf',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'renounceOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    { internalType: 'bool', name: 'approved', type: 'bool' },
                ],
                name: 'setApprovalForAll',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_gameMaster',
                        type: 'address',
                    },
                ],
                name: 'setGameMaster',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                name: 'stakedAmount',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'startGame',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'strToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'bytes4',
                        name: 'interfaceId',
                        type: 'bytes4',
                    },
                ],
                name: 'supportsInterface',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'symbol',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'tokenURI',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'transferOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'fromAgentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'toAgentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'transferTokensBetweenAgents',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'unstakeAGNT',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    { internalType: 'string', name: 'newBio', type: 'string' },
                ],
                name: 'updateBio',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'newWalletId',
                        type: 'string',
                    },
                ],
                name: 'updateWalletId',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'vitToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'withdrawTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
    },
    8453: {
        address: '0xC0dcE02d690D70E116A08A840FedFcA289AdA514',
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_gameMaster',
                        type: 'address',
                    },
                    { internalType: 'address', name: '_ens', type: 'address' },
                ],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'ERC721IncorrectOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ERC721InsufficientApproval',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'approver',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidApprover',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidOperator',
                type: 'error',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'ERC721InvalidOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidReceiver',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                ],
                name: 'ERC721InvalidSender',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ERC721NonexistentToken',
                type: 'error',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'OwnableInvalidOwner',
                type: 'error',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'OwnableUnauthorizedAccount',
                type: 'error',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                name: 'AGNTUnstaked',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'agentWallet',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'bio',
                        type: 'string',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'character',
                        type: 'string',
                    },
                ],
                name: 'AgentCreated',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'approved',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Approval',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'bool',
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                name: 'ApprovalForAll',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'AttributesMinted',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'newBio',
                        type: 'string',
                    },
                ],
                name: 'BioUpdated',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'oldGameMaster',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'newGameMaster',
                        type: 'address',
                    },
                ],
                name: 'GameMasterChanged',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: 'bool',
                        name: 'gameStarted',
                        type: 'bool',
                    },
                ],
                name: 'GameStateChanged',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'previousOwner',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'OwnershipTransferred',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'TokensDeposited',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'fromAgentId',
                        type: 'uint256',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'toAgentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'TokensTransferred',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                ],
                name: 'TokensWithdrawn',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'Transfer',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        indexed: false,
                        internalType: 'string',
                        name: 'newWalletId',
                        type: 'string',
                    },
                ],
                name: 'WalletIdUpdated',
                type: 'event',
            },
            {
                inputs: [],
                name: 'MINIMUM_STAKE',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: '_ownerAgents',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: '_tokenIdCounter',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentIntBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentStrBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentVitBalance',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                name: 'agentWallets',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'agntToken',
                outputs: [
                    {
                        internalType: 'contract IERC20',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'balanceOf',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'stakeAmount',
                        type: 'uint256',
                    },
                ],
                name: 'calculateMintableAttributes',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'pure',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'bio', type: 'string' },
                    {
                        internalType: 'string',
                        name: 'character',
                        type: 'string',
                    },
                ],
                name: 'createAgent',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'payable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'depositTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'ens',
                outputs: [
                    { internalType: 'contract ENS', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'gameMaster',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'gameStarted',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                ],
                name: 'getAgentTokenBalances',
                outputs: [
                    { internalType: 'uint256', name: 'str', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'intelligence',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitality',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                ],
                name: 'getAgentsByOwner',
                outputs: [
                    { internalType: 'uint256[]', name: '', type: 'uint256[]' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'getApproved',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'intToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'isApprovedForAll',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'stakeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'mintAttributes',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'name',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'owner',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ownerOf',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'renounceOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                name: 'safeTransferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'operator',
                        type: 'address',
                    },
                    { internalType: 'bool', name: 'approved', type: 'bool' },
                ],
                name: 'setApprovalForAll',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_gameMaster',
                        type: 'address',
                    },
                ],
                name: 'setGameMaster',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                name: 'stakedAmount',
                outputs: [
                    { internalType: 'uint256', name: '', type: 'uint256' },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'startGame',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'strToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'bytes4',
                        name: 'interfaceId',
                        type: 'bytes4',
                    },
                ],
                name: 'supportsInterface',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'symbol',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'tokenURI',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'newOwner',
                        type: 'address',
                    },
                ],
                name: 'transferOwnership',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'fromAgentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'toAgentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'transferTokensBetweenAgents',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'unstakeAGNT',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    { internalType: 'string', name: 'newBio', type: 'string' },
                ],
                name: 'updateBio',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'newWalletId',
                        type: 'string',
                    },
                ],
                name: 'updateWalletId',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'vitToken',
                outputs: [
                    {
                        internalType: 'contract AttributeToken',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'strAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'intAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'vitAmount',
                        type: 'uint256',
                    },
                ],
                name: 'withdrawTokens',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
    },
}

export const AGENT_WALLET_CONTRACT = {
    84532: {
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_factory',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: '_agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: '_name',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: '_bio',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: '_character',
                        type: 'string',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [],
                name: 'agentId',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'bio',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'character',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'factory',
                outputs: [
                    {
                        internalType: 'address',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_bio',
                        type: 'string',
                    },
                ],
                name: 'setBio',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_character',
                        type: 'string',
                    },
                ],
                name: 'setCharacter',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'bool',
                        name: 'locked',
                        type: 'bool',
                    },
                ],
                name: 'setTokensLocked',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_walletId',
                        type: 'string',
                    },
                ],
                name: 'setWalletId',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'tokensLocked',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'walletId',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ],
    },
    8453: {
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_factory',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: '_agentId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: '_name',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: '_bio',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: '_character',
                        type: 'string',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            {
                inputs: [],
                name: 'agentId',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'bio',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'character',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'factory',
                outputs: [
                    {
                        internalType: 'address',
                        name: '',
                        type: 'address',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_bio',
                        type: 'string',
                    },
                ],
                name: 'setBio',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_character',
                        type: 'string',
                    },
                ],
                name: 'setCharacter',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'bool',
                        name: 'locked',
                        type: 'bool',
                    },
                ],
                name: 'setTokensLocked',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'string',
                        name: '_walletId',
                        type: 'string',
                    },
                ],
                name: 'setWalletId',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                inputs: [],
                name: 'tokensLocked',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'walletId',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ],
    },
}
