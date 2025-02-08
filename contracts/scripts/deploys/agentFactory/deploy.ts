import hre from 'hardhat';

import AgentFactoryModule from '../../../ignition/modules/AgentFactoryModule';

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  // ================
  // 1) Deploy AgentFactory
  // ================
  const gameMaster = deployer.account.address;
  const ens = '0x49ae3cc2e3aa768b1e5654f5d3c6002144a59581';
  const { contract: agentFactory } = await hre.ignition.deploy(
    AgentFactoryModule,
    {
      parameters: {
        AgentFactoryModule: {
          gameMaster,
          ens
        },
      },
    }
  );

  console.log("AgentFactory deployed at:", agentFactory.address);

  // ================
  // Verify on block explorer
  // ================
  
  await hre.run("verify:verify", {
    address: agentFactory.address,
    constructorArguments: [gameMaster,ens],
  });
  console.log("AgentFactory verified!");
 
}

main().catch(console.error);
