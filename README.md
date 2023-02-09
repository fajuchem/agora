network: goerli <br />
smart contract address: https://goerli.etherscan.io/address/0x037f2B7c1352009ba41f9467eA7081c0313a2E90

### improvements:
- better error handling (for now it's mostly just logging)
- watch for network connected and send `wallet_switchEthereumChain` when its on wrong network
- watch for network change to request connection
- refine interection with wallet, for example check if wallet is unlocked instead of request accounts
- validate balance and quantity before calling `purchaseMineralFromPlanet`
- organize css, there is a lot unnecessary stuff
- typing interface between contract and entities from domain
- add some testing and error handling for contract interactions
