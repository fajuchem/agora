import { render } from "@testing-library/react";
import { useData } from "../hooks/useData";
import { getProviderMock } from "../test/getProviderMock";
import { PlanetList } from "./PlanetList";
import { PlanetListCard } from "./PlanetListCard";

jest.mock("../hooks/useData");
jest.mock("./PlanetListCard");

describe("PlanetList", () => {
  it("render card for planet", () => {
    const provider = getProviderMock();
    (useData as jest.Mock).mockReturnValue({
      minerals: [{ id: 0, name: "Spice-A", price: "0.00000000000001" }],
      planets: [
        {
          id: 0,
          mineralId: 0,
          name: "Agora-1",
          supply: 10,
        },
      ],
    });

    render(<PlanetList provider={provider} />);

    expect(PlanetListCard).toBeCalled();
  });
});
