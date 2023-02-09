import { ethers } from "hardhat";
const { CONTRACT_ADDRESS } = process.env;

async function main() {
  const agoraContract = await ethers.getContractAt(
    "AgoraMarket",
    CONTRACT_ADDRESS || ""
  );
  const minerals = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
  for (const [index, mineral] of minerals.entries()) {
    console.log(`adding planet: ${index}, mineral: ${mineral}`);
    await agoraContract.addPlanet(mineral, 10);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
