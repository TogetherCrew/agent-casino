import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const PredictModule = buildModule("PredictModule", (m) => {
  const oracleAddress = m.getParameter("oracleAddress");
  const adminAddress = m.getParameter("adminAddress");
  const operatorAddress = m.getParameter("operatorAddress");
  const intervalSeconds = m.getParameter("intervalSeconds");
  const bufferSeconds = m.getParameter("bufferSeconds");
  const minBetAmount = m.getParameter("minBetAmount");
  const oracleUpdateAllowance = m.getParameter("oracleUpdateAllowance");
  const treasuryFee = m.getParameter("treasuryFee");

  const contract = m.contract(
    "Predict", 
    [
      oracleAddress,
      adminAddress,
      operatorAddress,
      intervalSeconds,
      bufferSeconds,
      minBetAmount,
      oracleUpdateAllowance,
      treasuryFee,
    ],
    {}
  );

  return { contract };
});

export default PredictModule;
