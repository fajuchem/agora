import { Web3Provider } from "@ethersproject/providers";
import React, { useState } from "react";
import { purchaseMineralFromPlanet } from "../contracts/agoraMarket";
import { Mineral, Planet } from "../hooks/useData";
import "./PlanetListCard.css";

interface Props {
  provider: Web3Provider;
  planet: Planet;
  mineral: Mineral | undefined;
}

export const MemorizedPlanetListCard = React.memo(PlanetListCard);

export function PlanetListCard({ provider, planet, mineral }: Props) {
  const [quantity, setQuantity] = useState(1);
  const buy = async (
    provider: Web3Provider,
    planet: number,
    mineral: number,
    quantity: number
  ) => {
    try {
      purchaseMineralFromPlanet(provider, planet, mineral, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={planet.id} className="card border">
      <div className="text">
        <div> planet id: {planet.id}</div>
        <div> planet name: {planet.name}</div>
        <div> planet supply: {planet.supply}</div>
        <div key={planet.id}>
          <div> mineral id: {mineral?.id}</div>
          <div> mineral name: {mineral?.name}</div>
          <div> mineral price: {mineral?.price}</div>
        </div>
      </div>
      <div className="footer">
        <button
          className="buy"
          data-testid="buy"
          onClick={() => buy(provider, planet.id, planet.mineralId, quantity)}
        >
          buy
        </button>
        <input
          data-testid="input"
          className="input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
