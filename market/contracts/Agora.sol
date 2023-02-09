// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AgoraMarket {

    uint8 constant MINERAL_PRICE_DECIMAL=18;
    uint planetCounter = 0;

    struct Planet {
        address payable owner;
        uint mineral;
        uint supply;
    }

    // Spices entires are stored in the mineralPriceMap
    // Keys of the map are mineral/spice identifiers
    mapping (uint => uint) mineralPriceMap;
    mapping (uint => Planet) planetMap;
    address payable public owner;

    modifier onlyOwner () {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    event AddPlanet(uint indexed planetIndex, uint mineralIndex, uint supply);
    event UpdateMineralPrice(uint indexed mineralIndex, uint price);
    event PurchaseMineral(uint indexed planetIndex, uint indexed mineralIndex, uint price);

    constructor () {
        owner = payable(msg.sender);
        mineralPriceMap[0] = 1*10**16;
        mineralPriceMap[1] = 2*10**16;
        mineralPriceMap[2] = 3*10**16;
        mineralPriceMap[3] = 4*10**16;
    }

    function addPlanet(uint _mineral, uint _supply) public onlyOwner {
        planetMap[planetCounter] = Planet({
            owner: payable(msg.sender),
            mineral : _mineral,
            supply: _supply
        });

        emit AddPlanet(planetCounter, _mineral, _supply);
        planetCounter++;
    }

    function getPlanet(uint _planetIndex) external view returns (Planet memory) {
        return planetMap[_planetIndex];
    }

    function getAllPlanets() public view returns (Planet[] memory){
        Planet[] memory res = new Planet[](planetCounter);
        for (uint i = 0; i < planetCounter; i++) {
            res[i] = planetMap[i];
        }
        return res;
    }

    function getMineral(uint _mineralIndex) external view returns (uint) {
        return mineralPriceMap[_mineralIndex];
    }

    function getAllMinerals() public view returns (uint[] memory){
        uint[] memory res = new uint[](4);
        for (uint i = 0; i < 4; i++) {
            res[i] = mineralPriceMap[i];
        }
        return res;
    }

    function updateMineralPrice(uint _mineralIndex, uint price) public {
        require(_mineralIndex < 4,"Not a valid mineral");
        mineralPriceMap[_mineralIndex] = price;
        emit UpdateMineralPrice(_mineralIndex, price);
    }

    function purchaseMineralFromPlanet (uint _planetIndex, uint _mineralIndex, uint _quantity) payable public {
        require(_planetIndex < planetCounter, "Not a valid planet market");
        require(_mineralIndex < 4, "Not a valid mineral index");

        uint mineralPrice = mineralPriceMap[_mineralIndex];
        require(mineralPrice < msg.sender.balance, "Not enough balance");

        Planet storage planet = planetMap[_planetIndex];
        require(_quantity < planet.supply, "Not enough supply");

        // All's good
        planet.supply -= _quantity;

        emit PurchaseMineral(_planetIndex, _mineralIndex, _quantity);
    }
}
