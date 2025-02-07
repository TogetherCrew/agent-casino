// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgentWallet {
    string public name;
    string public bio;
    string public character;
    address public factory;       // AgentFactory contract
    uint256 public agentId;       // The NFT agent ID associated
    bool public tokensLocked;
    string public walletId; // "mpc coinbase wallet id"

    constructor(
        address _factory,
        uint256 _agentId,
        string memory _name,
        string memory _bio,
        string memory _character
    ) {
        factory = _factory;
        agentId = _agentId;
        name = _name;
        bio = _bio;
        character = _character;
    }

    modifier onlyFactory() {
        require(msg.sender == factory, "Not factory");
        _;
    }

    function setBio(string memory _bio) external onlyFactory {
        bio = _bio;
    }

    function setCharacter(string memory _character) external onlyFactory {
        character = _character;
    }

    function setTokensLocked(bool locked) external onlyFactory {
        tokensLocked = locked;
    }

    function setWalletId(string memory _walletId) external onlyFactory {
        walletId = _walletId;
    }
}