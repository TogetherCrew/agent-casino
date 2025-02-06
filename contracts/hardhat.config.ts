import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomiclabs/hardhat-solhint'

import { HardhatUserConfig, vars } from 'hardhat/config'
import { generatePrivateKey } from 'viem/accounts'

const PRIVATE_KEY = vars.has('PRIVATE_KEY')
    ? vars.get('PRIVATE_KEY')
    : generatePrivateKey()
const BASESCAN_API_KEY = vars.has('BASESCAN_API_KEY')
    ? vars.get('BASESCAN_API_KEY')
    : ''

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.26',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    networks: {
        baseSepolia: {
            chainId: 84532,
            accounts: [PRIVATE_KEY],
            url: 'https://sepolia.base.org',
        },
    },
    etherscan: {
        apiKey: {
            baseSepolia: BASESCAN_API_KEY,
        },
    },
}

export default config
