// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AgentWallet.sol";
import "./ENS.sol";

// Attribute token contract
contract AttributeToken is ERC20 {
    address public factory;

    constructor(
        string memory name,
        string memory symbol,
        address _factory
    ) ERC20(name, symbol) {
        factory = _factory;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == factory, "Only factory can mint");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == factory, "Only factory can burn");
        _burn(from, amount);
    }
}

contract AgentFactory is ERC721, Ownable {
    IERC20 public immutable agntToken;
    AttributeToken public immutable strToken;
    AttributeToken public immutable intToken;
    AttributeToken public immutable vitToken;

    address public gameMaster;
    uint256 public _tokenIdCounter;
    bool public gameStarted;
    uint256 public constant MINIMUM_STAKE = 1000 * 10 ** 18; // 1000 AGNT minimum stake

    mapping(uint256 => address) public agentWallets;
    mapping(address => uint256[]) public _ownerAgents;
    mapping(address => uint256) public stakedAmount;

    // ENS public ens = ENS(0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5);
    ENS public ens;
    struct RegisterRequest {
        string name;
        address owner;
        uint256 duration;
        address resolver;
        bytes[] data;
        bool reverseRecord;
    }

    event AgentCreated(
        uint256 indexed agentId,
        address indexed owner,
        address agentWallet,
        string name,
        string bio,
        string character
    );
    event TokensDeposited(
        uint256 indexed agentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    );
    event TokensWithdrawn(
        uint256 indexed agentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount,
        address to
    );
    event TokensTransferred(
        uint256 indexed fromAgentId,
        uint256 indexed toAgentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    );
    event GameStateChanged(bool gameStarted);
    event GameMasterChanged(
        address indexed oldGameMaster,
        address indexed newGameMaster
    );
    event BioUpdated(uint256 indexed agentId, string newBio);
    event WalletIdUpdated(uint256 indexed agentId, string newWalletId);
    event AttributesMinted(
        address indexed user,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    );
    event AGNTUnstaked(address indexed user, uint256 amount);


    modifier onlyAgentOwner(uint256 agentId) {
        require(ownerOf(agentId) == msg.sender, "Not agent owner");
        _;
    }

    modifier onlyGameMaster() {
        require(msg.sender == gameMaster, "Not game master");
        _;
    }

    modifier gameNotStarted() {
        require(!gameStarted, "Game already started");
        _;
    }

    constructor(
        address _gameMaster,
        address _ens
        // address _agntToken
    ) ERC721("AI Agent", "AIA") Ownable(msg.sender) {
        require(_gameMaster != address(0), "Invalid game master address");
        // require(_agntToken != address(0), "Invalid AGNT token address");

        require(_ens != address(0), "Invalid ENS address");
        ens = ENS(_ens);
        gameMaster = _gameMaster;
        // agntToken = IERC20(_agntToken);

        // Deploy attribute tokens
        // strToken = new AttributeToken("Strength Token", "STR", address(this));
        // intToken = new AttributeToken(
        //     "Intelligence Token",
        //     "INT",
        //     address(this)
        // );
        // vitToken = new AttributeToken("Vitality Token", "VIT", address(this));
    }

    function calculateMintableAttributes(
        uint256 stakeAmount
    ) public pure returns (uint256) {
        // Each MINIMUM_STAKE allows minting of 1000 total attribute points
        // This maintains the ratio of stake to attributes while allowing flexibility
        return (stakeAmount * 1000) / MINIMUM_STAKE;
    }

    function mintAttributes(
        uint256 stakeAmount,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    ) external {
        require(
            strAmount + intAmount + vitAmount > 0,
            "Must mint at least one attribute"
        );

        // Transfer AGNT tokens from user to contract
        require(
            agntToken.transferFrom(msg.sender, address(this), stakeAmount),
            "AGNT transfer failed"
        );
        
        // Check that total attributes being minted is within allowed amount
        require(
            strAmount + intAmount + vitAmount <=
                calculateMintableAttributes(stakeAmount),
            "Exceeds mintable attributes for stake amount"
        );

        // Track staked amount
        stakedAmount[msg.sender] += stakeAmount;

        // Mint attribute tokens
        if (strAmount > 0) strToken.mint(msg.sender, strAmount * 10**18);
        if (intAmount > 0) intToken.mint(msg.sender, intAmount * 10**18);
        if (vitAmount > 0) vitToken.mint(msg.sender, vitAmount * 10**18);

        emit AttributesMinted(msg.sender, strAmount, intAmount, vitAmount);
    }

    function unstakeAGNT(
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    ) external gameNotStarted {
        require(
            strAmount + intAmount + vitAmount > 0,
            "Must unstake at least one attribute"
        );

        // Check user has enough tokens to burn
        require(strToken.balanceOf(msg.sender) >= strAmount * 10**18, "Insufficient STR balance");
        require(intToken.balanceOf(msg.sender) >= intAmount * 10**18, "Insufficient INT balance");
        require(vitToken.balanceOf(msg.sender) >= vitAmount * 10**18, "Insufficient VIT balance");

        // Burn attribute tokens
        if (strAmount > 0) strToken.burn(msg.sender, strAmount * 10**18);
        if (intAmount > 0) intToken.burn(msg.sender, intAmount * 10**18);
        if (vitAmount > 0) vitToken.burn(msg.sender, vitAmount * 10**18);

        // Calculate AGNT to return based on attributes
        uint256 totalAttributes = strAmount + intAmount + vitAmount;
        uint256 agntToReturn = (totalAttributes * MINIMUM_STAKE) / 1000;

        // Check contract has enough AGNT to return
        require(agntToken.balanceOf(address(this)) >= agntToReturn, "Insufficient AGNT in contract");

        // Return AGNT tokens
        require(
            agntToken.transfer(msg.sender, agntToReturn),
            "AGNT transfer failed"
        );

        emit AGNTUnstaked(msg.sender, agntToReturn);
    }

    function setGameMaster(address _gameMaster) external onlyOwner {
        require(_gameMaster != address(0), "Invalid game master address");
        address oldGameMaster = gameMaster;
        gameMaster = _gameMaster;
        emit GameMasterChanged(oldGameMaster, _gameMaster);
    }

    function startGame() external onlyGameMaster gameNotStarted {
        gameStarted = true;
        emit GameStateChanged(true);
    }

    function createAgent(
        string memory name,
        string memory bio,
        string memory character
    ) external payable returns (uint256, address) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(bio).length > 0, "Bio cannot be empty");
        require(bytes(character).length > 0, "Character cannot be empty");
        
        require(bytes(name).length <= 32, "Name cannot be longer than 32 characters");
        require(bytes(bio).length <= 1100, "Bio cannot be longer than 1100 characters");
        require(bytes(character).length <= 1100, "Character cannot be longer than 1100 characters");

        _tokenIdCounter++;
        uint256 newAgentId = _tokenIdCounter;
        _safeMint(msg.sender, newAgentId);

        AgentWallet wallet = new AgentWallet(
            address(this),
            newAgentId,
            name,
            bio,
            character
        );
        agentWallets[newAgentId] = address(wallet);
        _ownerAgents[msg.sender].push(newAgentId);

        // function register(
        //     RegistrarController.RegisterRequest memory request
        // ) external payable;

        uint256 price = ens.registerPrice(name, 31536000);
        // Register the ENS name for this agent
        ens.register{value: price}(
            RegistrarController.RegisterRequest({
                name: name,
                owner: address(wallet),
                duration: 31536000,
                resolver: address(this),
                data: new bytes[](0),
                reverseRecord: false
            })
        );

        emit AgentCreated(
            newAgentId,
            msg.sender,
            address(wallet),
            name,
            bio,
            character
        );
        return (newAgentId, address(wallet));
    }

    function depositTokens(
        uint256 agentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    ) external gameNotStarted onlyAgentOwner(agentId) {
        require(
            strAmount > 0 || intAmount > 0 || vitAmount > 0,
            "No tokens to deposit"
        );

        if (strAmount > 0) {
            strToken.transferFrom(msg.sender, address(this), strAmount * 10**18);
            agentStrBalance[agentId] += strAmount * 10**18;
        }
        if (intAmount > 0) {
            intToken.transferFrom(msg.sender, address(this), intAmount * 10**18);
            agentIntBalance[agentId] += intAmount * 10**18;
        }
        if (vitAmount > 0) {
            vitToken.transferFrom(msg.sender, address(this), vitAmount * 10**18);
            agentVitBalance[agentId] += vitAmount * 10**18;
        }

        emit TokensDeposited(agentId, strAmount, intAmount, vitAmount);
    }

    function withdrawTokens(
        uint256 agentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    ) external onlyAgentOwner(agentId) {
        require(
            strAmount > 0 || intAmount > 0 || vitAmount > 0,
            "No tokens to withdraw"
        );
        require(
            strAmount * 10**18 <= agentStrBalance[agentId] &&
            intAmount * 10**18 <= agentIntBalance[agentId] &&
            vitAmount * 10**18 <= agentVitBalance[agentId],
            "Insufficient balance"
        );

        if (strAmount > 0) {
            agentStrBalance[agentId] -= strAmount * 10**18;
            strToken.transfer(msg.sender, strAmount * 10**18);
        }
        if (intAmount > 0) {
            agentIntBalance[agentId] -= intAmount * 10**18;
            intToken.transfer(msg.sender, intAmount * 10**18);
        }
        if (vitAmount > 0) {
            agentVitBalance[agentId] -= vitAmount * 10**18;
            vitToken.transfer(msg.sender, vitAmount * 10**18);
        }

        emit TokensWithdrawn(agentId, strAmount, intAmount, vitAmount, msg.sender);
    }

    function transferTokensBetweenAgents(
        uint256 fromAgentId,
        uint256 toAgentId,
        uint256 strAmount,
        uint256 intAmount,
        uint256 vitAmount
    ) external onlyGameMaster {
        require(fromAgentId != toAgentId, "Cannot transfer to same agent");
        require(
            agentWallets[fromAgentId] != address(0) && agentWallets[toAgentId] != address(0),
            "Invalid agents"
        );
        require(
            strAmount * 10**18 <= agentStrBalance[fromAgentId] &&
            intAmount * 10**18 <= agentIntBalance[fromAgentId] &&
            vitAmount * 10**18 <= agentVitBalance[fromAgentId],
            "Insufficient balance"
        );

        // Update balances
        if (strAmount > 0) {
            agentStrBalance[fromAgentId] -= strAmount * 10**18;
            agentStrBalance[toAgentId] += strAmount * 10**18;
        }
        if (intAmount > 0) {
            agentIntBalance[fromAgentId] -= intAmount * 10**18;
            agentIntBalance[toAgentId] += intAmount * 10**18;
        }
        if (vitAmount > 0) {
            agentVitBalance[fromAgentId] -= vitAmount * 10**18;
            agentVitBalance[toAgentId] += vitAmount * 10**18;
        }

        emit TokensTransferred(fromAgentId, toAgentId, strAmount, intAmount, vitAmount);
    }

    function updateBio(
        uint256 agentId,
        string memory newBio
    ) external onlyAgentOwner(agentId) {
        require(bytes(newBio).length > 0, "Bio cannot be empty");

        AgentWallet wallet = AgentWallet(agentWallets[agentId]);
        wallet.setBio(newBio);

        emit BioUpdated(agentId, newBio);
    }

    function updateWalletId(uint256 agentId, string calldata newWalletId)
        external
        onlyGameMaster
    {
        require(agentWallets[agentId] != address(0), "Invalid agentId");

        AgentWallet wallet = AgentWallet(agentWallets[agentId]);

        wallet.setWalletId(newWalletId);
        emit WalletIdUpdated(agentId, newWalletId);
    }

    // Utility functions
    function getAgentTokenBalances(uint256 agentId)
        external
        view
        returns (uint256 str, uint256 intelligence, uint256 vitality)
    {
        require(agentWallets[agentId] != address(0), "Agent does not exist");
        return (
            agentStrBalance[agentId],
            agentIntBalance[agentId],
            agentVitBalance[agentId]
        );
    }

    function getAgentsByOwner(
        address owner
    ) external view returns (uint256[] memory) {
        require(owner != address(0), "Invalid owner address");
        return _ownerAgents[owner];
    }

    // Add balance tracking in factory
    mapping(uint256 => uint256) public agentStrBalance;
    mapping(uint256 => uint256) public agentIntBalance;
    mapping(uint256 => uint256) public agentVitBalance;
}