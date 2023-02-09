import { Web3Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import abi from "../data/AgoraMarket.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || "";
const contractABI = abi.abi;

export function getContract(provider: Web3Provider): Contract {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}
