import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";

interface Props {
  provider: Web3Provider | undefined;
}

export function useWallet({ provider }: Props) {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async (provider: Web3Provider) => {
    try {
      if (provider) {
        const [accountAddress] = (await provider.send(
          "eth_requestAccounts",
          []
        )) as string[];

        if (accountAddress) {
          setCurrentAccount(accountAddress);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async (provider: Web3Provider) => {
    try {
      const [accountAddress] = (await provider.send(
        "eth_requestAccounts",
        []
      )) as string[];

      setCurrentAccount(accountAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (provider && !currentAccount) {
      checkIfWalletIsConnected(provider);
    }
  }, [provider, currentAccount]);

  return {
    currentAccount,
    connectWallet,
  };
}
