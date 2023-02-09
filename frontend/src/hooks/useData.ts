import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import {
  getAllMinerals,
  getAllPlanets,
  offEvent,
  onEvent,
} from "../contracts/agoraMarket";
import { BigNumber, ethers } from "ethers";

export class Planet {
  constructor(
    public id: number,
    public mineralId: number,
    public supply: number
  ) {}

  public readonly name = `Agora-${this.id + 1}`;

  static newFromContract(allPlanets: any): Planet[] {
    return allPlanets.map(
      (p: any, index: number) =>
        new Planet(index, p.mineral.toNumber(), p.supply.toNumber())
    );
  }
}

export class Mineral {
  constructor(public id: number, public price: string) {}

  public readonly name = `Spice-${String.fromCharCode(65 + this.id)}`;

  static newFromContract(allMinerals: any): Mineral[] {
    return allMinerals.map(
      (p: BigNumber, index: number) =>
        new Mineral(index, ethers.utils.formatEther(p.toString()))
    );
  }
}

interface Props {
  provider: Web3Provider;
}

export function useData({ provider }: Props) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [minerals, setMinerals] = useState<Mineral[]>([]);

  const getData = async () => {
    getAllMinerals(provider)
      .then((allMinerals) => setMinerals(Mineral.newFromContract(allMinerals)))
      .catch((e) => console.log(e));

    getAllPlanets(provider)
      .then((allPlanets) => setPlanets(Planet.newFromContract(allPlanets)))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const updateMineralPrice = (mineralIndex: any, price: any) => {
      setMinerals((prevState) => {
        return {
          ...prevState,
          [mineralIndex.toNumber()]: new Mineral(
            mineralIndex.toNumber(),
            ethers.utils.formatEther(price.toString())
          ),
        };
      });
    };

    // Ideally you would call contract.getPlanet and fetch only the planet that was updated
    const purchaseMineralFromPlanet = async (
      _planetIndex: any,
      _mineralIndex: any,
      _price: any
    ) => {
      const allPlanets = await getAllPlanets(provider);
      setPlanets(Planet.newFromContract(allPlanets));
    };

    getData().then(() => {
      onEvent(provider, "UpdateMineralPrice", updateMineralPrice);
      onEvent(provider, "PurchaseMineral", purchaseMineralFromPlanet);
    });

    return () => {
      offEvent(provider, "UpdateMineralPrice", updateMineralPrice);
      offEvent(provider, "PurchaseMineral", purchaseMineralFromPlanet);
    };
  }, [provider]);

  return { planets, minerals };
}
