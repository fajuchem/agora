import { expect } from "chai";
import { ethers } from "hardhat";

describe("Agora Market", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  const DECIMAL = 18;

  async function getFixture() {
    const [owner, otherAccounts] = await ethers.getSigners();
    const AgoraFactory = await ethers.getContractFactory("AgoraMarket");
    const agoraInstance = await AgoraFactory.deploy();

    return {
      owner,
      otherAccounts,
      agoraInstance,
    };
  }

  describe("Add planet", async function () {
    it("Should add planet", async () => {
      const { agoraInstance, owner } = await getFixture();
      await agoraInstance.addPlanet(0, 1000);
      const planet = await agoraInstance.getPlanet(0);
      expect(planet.owner).to.equal(owner.address);
    });
  });

  describe("Get mineral", async function () {
    it("Should get mineral price", async () => {
      const { agoraInstance, owner, otherAccounts } = await getFixture();
      await agoraInstance.addPlanet(0, 1000);
      const mineralPrice = await agoraInstance.getMineral(0);
    });
  });

  describe("Purchase Mineral", async function () {
    it("Should purchase", async () => {
      const { agoraInstance, owner, otherAccounts } = await getFixture();
      // Add market
      await agoraInstance.addPlanet(0, 1000);
      await agoraInstance.purchaseMineralFromPlanet(0, 0, 10);
      const planet = await agoraInstance.getPlanet(0);
      expect(await agoraInstance.owner()).to.equal(owner.address);
    });
  });

  describe("Update Price", async function () {
    it("Should update price", async () => {
      const { agoraInstance, owner, otherAccounts } = await getFixture();
      const oldMineralPrice = await agoraInstance.getMineral(0);
      const mineralPriceInEth = ethers.utils.parseUnits("2", DECIMAL - 2);
      // Add market
      await agoraInstance.updateMineralPrice(0, mineralPriceInEth);
      const newMineralPrice = await agoraInstance.getMineral(0);
      expect(oldMineralPrice.toString()).not.to.equal(
        newMineralPrice.toString()
      );
    });
  });
});
