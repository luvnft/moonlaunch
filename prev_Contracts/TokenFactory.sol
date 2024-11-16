// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Token.sol";

contract TokenFactory {

    function create_token(uint256 initialSupply, string memory tokenName, string memory tokenSymbol) external {
        new Token(initialSupply, tokenName, tokenSymbol);
    }
}