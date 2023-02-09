import { Web3Provider } from "@ethersproject/providers";
import { getContract } from "./contract";

export function onEvent(
  provider: Web3Provider,
  eventName: "UpdateMineralPrice" | "PurchaseMineral",
  callback: (...args: any[]) => void
) {
  const contract = getContract(provider);
  contract.on(eventName, callback);
}

export function offEvent(
  provider: Web3Provider,
  eventName: "UpdateMineralPrice" | "PurchaseMineral",
  callback: (...args: any[]) => void
) {
  const contract = getContract(provider);
  contract.off(eventName, callback);
}

export async function getAllMinerals(provider: Web3Provider): Promise<any> {
  const contract = getContract(provider);
  return contract.getAllMinerals();
}

export async function getAllPlanets(provider: Web3Provider): Promise<any> {
  const contract = getContract(provider);
  return contract.getAllPlanets();
}

export async function getPlanet(
  provider: Web3Provider,
  planetIndex: number
): Promise<any> {
  const contract = getContract(provider);
  return contract.getPlanet(planetIndex);
}

export async function purchaseMineralFromPlanet(
  provider: Web3Provider,
  planet: number,
  mineral: number,
  quantity: number
): Promise<void> {
  const contract = getContract(provider);
  return contract.purchaseMineralFromPlanet(planet, mineral, quantity);
}
