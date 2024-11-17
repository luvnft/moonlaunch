// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol ) ERC20(tokenName, tokenSymbol) {
        _mint(msg.sender, initialSupply);
    }
}