// import { ethers } from "hardhat";
import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  console.log("What!");
  const oneAccount = accounts[0];
  const twoAccount = accounts[1];

  for (const account of accounts) {
    console.log(account.address, await account.getBalance());
  }

  const txn = await oneAccount.sendTransaction({
    to: twoAccount.address,
    value: hre.ethers.utils.parseEther("2200"),
  });

  await txn.wait();

  for (const account of accounts) {
    console.log(account.address, await account.getBalance());
  }
});
