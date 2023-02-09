import { useProvider } from "./hooks/useProvider";
import { PlanetList } from "./components/PlanetList";
import { useWallet } from "./hooks/useWallet";

const App = () => {
  const provider = useProvider();

  const { currentAccount, connectWallet } = useWallet({ provider });

  if (!provider) {
    return <>no provider detected</>;
  }

  if (!currentAccount) {
    return (
      <>
        <button onClick={() => connectWallet(provider)}>Connect Wallet</button>
      </>
    );
  }

  return <PlanetList provider={provider} />;
};

export default App;
