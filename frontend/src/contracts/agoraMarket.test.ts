import {
  getAllMinerals,
  getAllPlanets,
  purchaseMineralFromPlanet,
} from "../contracts/agoraMarket";
import { getProviderMock } from "../test/getProviderMock";
import { getContract } from "./contract";

jest.mock("./contract", () => ({
  getContract: jest.fn(),
}));

describe("agoraMarket", () => {
  it("getAllMinerals", async () => {
    const getAllMineralsMock = jest.fn();
    (getContract as jest.Mock).mockReturnValue({
      getAllMinerals: getAllMineralsMock,
    });
    const provider = getProviderMock();
    await getAllMinerals(provider);
    expect(getAllMineralsMock).toBeCalled();
  });

  it("getAllPlanets", async () => {
    const getAllPlanetsMock = jest.fn();
    (getContract as jest.Mock).mockReturnValue({
      getAllPlanets: getAllPlanetsMock,
    });
    const provider = getProviderMock();
    await getAllPlanets(provider);
    expect(getAllPlanetsMock).toBeCalled();
  });

  it("purchaseMineralFromPlanet", async () => {
    const purchaseMineralFromPlanetMock = jest.fn();
    (getContract as jest.Mock).mockReturnValue({
      purchaseMineralFromPlanet: purchaseMineralFromPlanetMock,
    });
    const provider = getProviderMock();
    await purchaseMineralFromPlanet(provider, 0, 0, 1);
    expect(purchaseMineralFromPlanetMock).toBeCalled();
  });
});
