import { render, screen } from "@testing-library/react";
import App from "./App";
import { PlanetList } from "./components/PlanetList";
import { useProvider } from "./hooks/useProvider";
import { useWallet } from "./hooks/useWallet";
import { getProviderMock } from "./test/getProviderMock";

jest.mock("./hooks/useProvider");
jest.mock("./hooks/useWallet");
jest.mock("./components/PlanetList");

describe("App", () => {
  it("dont have provider", () => {
    (useProvider as jest.Mock).mockReturnValue(undefined);
    (useWallet as jest.Mock).mockReturnValue({ currentAccount: "" });
    render(<App />);
    const linkElement = screen.getByText(/no provider detected/i);
    expect(linkElement).toBeInTheDocument();
  });

  describe("connect button", () => {
    const connectWallet = jest.fn();
    beforeEach(() => {
      (useWallet as jest.Mock).mockReturnValue({
        connectWallet,
        currentAccount: "",
      });
      (useProvider as jest.Mock).mockReturnValue(getProviderMock());
    });

    it("show connect button", () => {
      render(<App />);
      const linkElement = screen.getByText(/Connect Wallet/i);
      expect(linkElement).toBeInTheDocument();
    });

    it("click on button call provider", () => {
      render(<App />);
      const linkElement = screen.getByText(/Connect Wallet/i);
      linkElement.click();

      expect(connectWallet).toBeCalled();
    });
  });

  describe("show list", () => {
    beforeEach(() => {
      (useWallet as jest.Mock).mockReturnValue({
        currentAccount: "wallet",
      });
      (useProvider as jest.Mock).mockReturnValue(getProviderMock());
    });

    it("doesnt show connect button when is connected", () => {
      render(<App />);
      const linkElement = screen.queryByText(/Connect Wallet/i);
      expect(linkElement).not.toBeInTheDocument();
    });

    it("show list when connected", () => {
      render(<App />);
      expect(PlanetList).toBeCalled();
    });
  });
});
