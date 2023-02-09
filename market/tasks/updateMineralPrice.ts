import { task } from "hardhat/config";

const { CONTRACT_ADDRESS } = process.env;

task("updateMineralPrice", "Update the price of a mineral")
  .addParam("mineral", "The index of the mineral")
  .addParam("price", "The price of the mineral")
  .setAction(async (taskArgs, hre) => {
    const agoraContract = await hre.ethers.getContractAt(
      "AgoraMarket",
      CONTRACT_ADDRESS || ""
    );
    await agoraContract.updateMineralPrice(taskArgs.mineral, taskArgs.price);
    const mineral = await agoraContract.getMineral(taskArgs.mineral);
    console.log(mineral);
  });
