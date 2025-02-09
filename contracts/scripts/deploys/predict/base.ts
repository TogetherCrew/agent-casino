import hre from "hardhat";
import { parseUnits } from "viem";

import PredictModule from "../../../ignition/modules/PredictModule";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();

  // ================
  // 1) Deploy Predict
  // ================
  const oracleAddress = "0xA2b185439079CaA3C68d3E33440b364dde8d599E";
  const adminAddress = deployer.account.address;
  const operatorAddress = deployer.account.address;
  const intervalSeconds = 300;
  const bufferSeconds = 30;
  const minBetAmount = parseUnits("0.01", 18);
  const oracleUpdateAllowance = 120;
  const treasuryFee = 200;

  // Deploy Predict
  const { contract: predict } = await hre.ignition.deploy(PredictModule, {
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
  });

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
