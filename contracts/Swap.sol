// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Exchange is ERC20 {

    address public tokenAddress;

    constructor(address token) ERC20("Eth Token LP Token", "lpETHToken") {
        
        require(token != address(0), "Token address passed is a null address");

        tokenAddress = token;
    }

    function get_reserve() public view returns(uint256) {
        return ERC20(tokenAddress).balanceOf(address(this));
    }

    function addLiquidity(uint256 amountOfToken) public payable returns (uint256) {

        uint256 lpTokensToMint;
        uint256 ethReserveBalance = address(this).balance;
        uint256 tokenReserveBalance = get_reserve();

        ERC20 token = ERC20(tokenAddress);

        if(tokenReserveBalance == 0) {
            ERC20(tokenAddress).transferFrom(msg.sender, address(this), amountOfToken);

            lpTokensToMint = ethReserveBalance;

            _mint(msg.sender, lpTokensToMint);
        } else {
            uint256 ethReservePriorToFunctionCall = ethReserveBalance - msg.value;
            uint256 minAmountRequired = (msg.value * tokenReserveBalance) / ethReservePriorToFunctionCall;

            require(amountOfToken >= minAmountRequired, "Insufficient amount of tokens provided");

            token.transferFrom(msg.sender, address(this), minAmountRequired);

            lpTokensToMint = (totalSupply() * msg.value) / ethReservePriorToFunctionCall;
            _mint(msg.sender, lpTokensToMint);

            return lpTokensToMint;
        }
    }

    function removeLiquidity(
        uint256 amountOfLPToken
    ) public payable returns (uint256, uint256) {

        require(amountOfLPToken > 0, "amount of LP Tokens to remove should be grater than 0");
        
        uint256 ethReserveBalance = address(this).balance;
        uint256 lpTokenTotalSupply = totalSupply();
        
        //Calculate the amount of ETH and tokens to return to the user
        uint256 ethToReturn = (ethReserveBalance * amountOfLPToken) / lpTokenTotalSupply;
        uint256 tokenToReturn = (get_reserve() * amountOfLPToken) / lpTokenTotalSupply;

        // Burn the LP Tokens from the user, and transfer the eth and token to the user
        _burn(msg.sender, amountOfLPToken);
        payable(msg.sender).transfer(ethToReturn);
        ERC20(tokenAddress).transfer(msg.sender, tokenToReturn);

        return (ethToReturn, tokenToReturn);
    }

    // getOutputAMountFromSwap claculates the amount of output tokens to be received based on x * y = (x + dx) (y -dy)
    function getoutputAmountFromSwap(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public view returns (uint256) {
        
        require(inputReserve > 0 && outputReserve > 0, "Reserves must be greater than 0");

        uint256 inputAmountWithFee = inputAmount * 99;

        
        uint256 numerator = outputReserve * inputAmountWithFee;
        uint256 denominator = inputAmount + inputAmountWithFee;

        return (numerator / denominator);
    }

    // It allows users to swap eth for token
    function ethToTokenSwap(
        uint256 minTokensToReceive
    ) public payable {
        uint256 tokensReserve = get_reserve();

        uint256 tokensToReceive = getoutputAmountFromSwap(
            msg.value,
            address(this).balance - msg.value,
            tokensReserve
        );   

        require(tokensToReceive >= minTokensToReceive, "Tokens reecived are less than minimum tokens are expected");
        ERC20(tokenAddress).transfer(msg.sender, tokensToReceive);
    }

    // tokenToEth swap allows users to swap tokens for Eth
    function tokenToEthSwap(
        uint256 tokensToSwap,
        uint256 minEthToReceive
    ) public payable {
        uint256 tokenReserveBalance = get_reserve();
        
        uint256 ethToReceive = getoutputAmountFromSwap(
            tokensToSwap,
            tokenReserveBalance,
            address(this).balance
        );

        require(ethToReceive >= minEthToReceive, "ETH Received is less than minimum ETH Expected");

        ERC20(tokenAddress).transferFrom(msg.sender, address(this), tokensToSwap);
        payable(msg.sender).transfer(ethToReceive);
    }

}
