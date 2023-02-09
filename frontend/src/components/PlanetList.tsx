import { Web3Provider } from "@ethersproject/providers";
import { MemorizedPlanetListCard } from "../components/PlanetListCard";
import { useData } from "../hooks/useData";
import "./PlanetList.css";

interface Props {
  provider: Web3Provider;
}

export const PlanetList = ({ provider }: Props) => {
  const { planets, minerals } = useData({ provider });

  return (
    <div className="wrapper">
      {planets.map((planet) => (
        <MemorizedPlanetListCard
          provider={provider}
          planet={planet}
          mineral={minerals[planet.mineralId]}
          key={planet.id}
        />
      ))}
    </div>
  );
};
