import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const AgentFactoryModule = buildModule("AgentFactoryModule", (m) => {
  const gameMaster = m.getParameter("gameMaster");

  const contract = m.contract(
    "AgentFactory",
    [gameMaster],   
    {}
  );
  return { contract };
});

export default AgentFactoryModule;
