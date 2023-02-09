import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { BigNumber } from "ethers";
import { getAllMinerals, getAllPlanets } from "../contracts/agoraMarket";
import { getProviderMock } from "../test/getProviderMock";
import { useData } from "./useData";

jest.mock("../contracts/agoraMarket");

describe("useData", () => {
  it("should return undefined provider", async () => {
    (getAllMinerals as jest.Mock).mockResolvedValue([BigNumber.from(10000)]);
    (getAllPlanets as jest.Mock).mockResolvedValue([
      { mineral: BigNumber.from(0), supply: BigNumber.from(10) },
    ]);
    const provider = getProviderMock();
    const { result } = renderHook(() => useData({ provider }));

    await waitFor(() => {
      expect(result.current).toEqual({
        minerals: [{ id: 0, name: "Spice-A", price: "0.00000000000001" }],
        planets: [
          {
            id: 0,
            mineralId: 0,
            name: "Agora-1",
            supply: 10,
          },
        ],
      });
    });
  });
});
