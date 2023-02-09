import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { getProviderMock } from "../test/getProviderMock";
import { useWallet } from "./useWallet";

describe("useWallet", () => {
  it("should not find account connected", async () => {
    const provider = getProviderMock();
    const { result } = renderHook(() => useWallet({ provider }));

    await waitFor(() => {
      expect(result.current.currentAccount).toBe("");
    });
  });

  it("when provider is not defined doesnt try to connect", async () => {
    const { result } = renderHook(() => useWallet({ provider: undefined }));

    await waitFor(() => {
      expect(result.current.currentAccount).toBe("");
    });
  });

  it("call provider to connect wallet", async () => {
    const provider = getProviderMock();
    (provider.send as jest.Mock).mockResolvedValue(["wallet"]);
    const { result } = renderHook(() => useWallet({ provider }));

    result.current.connectWallet(provider);

    await waitFor(() => {
      expect(result.current.currentAccount).toBe("wallet");
    });
  });
});
