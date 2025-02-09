import hre from 'hardhat';
import { parseUnits } from 'viem';

import PredictModule from '../../../ignition/modules/PredictModule';

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  // ================
  // 1) Deploy Predict
  // ================
  const oracleAddress = "0x10Cd3Ee16501d7b754311107555AFE1eBd38CC1e";
  const adminAddress = deployer.account.address;
  const operatorAddress = deployer.account.address;
  const intervalSeconds = 300;         
  const bufferSeconds = 30;          
  const minBetAmount =  parseUnits("0.01",18)
  const oracleUpdateAllowance = 120;   
  const treasuryFee = 200;          

  // Deploy Predict
  const { contract: predict } = await hre.ignition.deploy(
    PredictModule,
    {
      parameters: {
        PredictModule: {
          oracleAddress,
          adminAddress,
          operatorAddress,
          intervalSeconds,
          bufferSeconds,
          minBetAmount,
          oracleUpdateAllowance,
          treasuryFee,
        },
      },
    }
  );

  console.log("Predict deployed at:", predict.address);



  // ================
  // Verify on block explorer
  // ================

  await hre.run("verify:verify", {
    address: predict.address,
    constructorArguments: [
      oracleAddress,
      adminAddress,
      operatorAddress,
      intervalSeconds,
      bufferSeconds,
      minBetAmount,
      oracleUpdateAllowance,
      treasuryFee,
    ],
  });
  console.log("Predict verified!");
  
}

main().catch(console.error);
