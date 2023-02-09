import { fireEvent, render, screen } from "@testing-library/react";
import { purchaseMineralFromPlanet } from "../contracts/agoraMarket";
import { Mineral, Planet } from "../hooks/useData";
import { getProviderMock } from "../test/getProviderMock";
import { PlanetListCard } from "./PlanetListCard";

jest.mock("../contracts/agoraMarket");

describe("PlanetListCard", () => {
  it("display planet and mineral info", () => {
    const provider = getProviderMock();
    const planet = new Planet(0, 0, 10);
    const mineral = new Mineral(0, "0.01");

    render(
      <PlanetListCard provider={provider} planet={planet} mineral={mineral} />
    );

    expect(screen.getByText(/planet id: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/planet name: Agora-1/i)).toBeInTheDocument();
    expect(screen.getByText(/planet supply: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/mineral id: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/mineral name: Spice-A/i)).toBeInTheDocument();
    expect(screen.getByText(/mineral price: 0.01/i)).toBeInTheDocument();
  });

  it("buy mineral", () => {
    const provider = getProviderMock();
    const planet = new Planet(0, 0, 10);
    const mineral = new Mineral(0, "0.01");

    render(
      <PlanetListCard provider={provider} planet={planet} mineral={mineral} />
    );

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "1" } });

    const buy = screen.getByTestId("buy");
    fireEvent.click(buy);

    expect(purchaseMineralFromPlanet).toBeCalled();
  });
});
