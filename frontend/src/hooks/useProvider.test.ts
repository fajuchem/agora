import { Web3Provider } from "@ethersproject/providers";
import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { useProvider } from "./useProvider";

describe("useProvider", () => {
  it("should return undefined provider", async () => {
    const { result } = renderHook(() => useProvider());

    await waitFor(() => {
      expect(result.current).toBe(undefined);
    });
  });

  it("should return provider", async () => {
    window.ethereum = jest.fn();
    const { result } = renderHook(() => useProvider());

    await waitFor(() => {
      expect(result.current).toBeInstanceOf(Web3Provider);
    });
  });
});
