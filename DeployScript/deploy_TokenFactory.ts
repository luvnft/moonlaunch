import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";

const deployContract = async () => {
  try {
    // Replace with your provider URL
    const providerUrl = "https://devnet.neonevm.org";
    const provider = new ethers.JsonRpcProvider(providerUrl);

    // Replace with your private key
    const privateKey =
      "95c5da91a9fc55627b73bd8720d09a05249643446d3ad97ecbac7328f141e777";
    const wallet = new ethers.Wallet(privateKey, provider);

    // Replace with the path to your compiled contract artifacts
    const contractArtifactsPath = path.join(
      __dirname,
      "artifacts",
      "MyContract.json"
    );
    const contractJson = JSON.parse(
      fs.readFileSync(contractArtifactsPath, "utf8")
    );

    // Extract ABI and Bytecode from compiled contract
    const { abi, bytecode } = contractJson;

    console.log("Deploying contract...");

    // Create a ContractFactory
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Deploy the contract with constructor arguments if needed
    const contract = await factory.deploy(/* Constructor arguments go here */);

    console.log("Transaction hash:", contract.deploymentTransaction()?.hash);

    // Wait for the contract deployment transaction to be mined
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    console.log("Contract deployed at:", contractAddress);

    return contractAddress;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

// Call the deployment function
deployContract().catch((error) => {
  console.error("Deployment failed:", error);
});
