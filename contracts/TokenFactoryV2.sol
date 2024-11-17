// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract TokenFactory {
    IEntropy public entropy;

    struct TokenCreatorData {
        address tokenCreator;
        Token tokenAddress;
    }

    mapping(address => mapping(uint256 => TokenCreatorData)) public userToMintedToken;
    mapping(address => uint256) public userToTokenId;

    constructor(address entropyAddress) {
        entropy = IEntropy(entropyAddress);
    }

    function create_token(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) external {
        Token newTokenAddr = new Token(initialSupply, tokenName, tokenSymbol);
        TokenCreatorData memory tokenData = TokenCreatorData(
            msg.sender,
            newTokenAddr
        );
        userToMintedToken[msg.sender][userToTokenId[msg.sender]] = tokenData;
        userToTokenId[msg.sender] = userToTokenId[msg.sender] + 1;
    }

    function buy_token(address creator_address, address token_address, uint256 amount) external {
        IERC20 token = IERC20(token_address);
        token.transferFrom(creator_address, msg.sender, amount);
    }

    function requestRandomNumber(bytes32 userRandomNumber) external payable {
        // Get the default provider's address
        address entropyProvider = entropy.getDefaultProvider();

        // Calculate the fee
        uint256 fee = entropy.getFee(entropyProvider);

        // Request the random number and specify the callback
        uint64 sequenceNumber = entropy.requestWithCallback{ value: fee }(
            entropyProvider,
            userRandomNumber
        );

        // Optionally store `sequenceNumber` to track the request
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address provider,
        bytes32 randomNumber
    ) internal override {
        // Use the random number here
        // Example: emit an event with the generated random number
        emit RandomNumberGenerated(sequenceNumber, provider, randomNumber);
    }

    // Event to track generated random numbers
    event RandomNumberGenerated(uint64 sequenceNumber, address provider, bytes32 randomNumber);

}