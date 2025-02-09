import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const AgentFactoryModule = buildModule("AgentFactoryModule", (m) => {
  const gameMaster = m.getParameter("gameMaster");
  const ens = m.getParameter("ens");

  const contract = m.contract(
    "AgentFactory",
    [gameMaster,ens],   
    {}
  );
  return { contract };
});

export default AgentFactoryModule;
