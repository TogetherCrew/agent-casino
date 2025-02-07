import hre from 'hardhat';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

import AgentFactoryModule from '../../ignition/modules/AgentFactoryModule';

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  const gameMaster = deployer.account.address;


const publicClient = createPublicClient({
	chain: baseSepolia,
	transport: http("https://sepolia.base.org"),
});


    const { contract: agentFactory } = await hre.ignition.deploy(AgentFactoryModule, {
		parameters: {
			AgentFactoryModule: { gameMaster },
		},
    });
  console.log("AgentFactory deployed at:", agentFactory.address);

}

main().catch(console.error);
