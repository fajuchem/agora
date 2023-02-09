import { useEffect, useMemo, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export function useProvider(): Web3Provider | undefined {
  const [provider, setProvider] = useState<Web3Provider>();

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  return useMemo(() => provider, [provider]);
}
