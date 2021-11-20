pragma solidity >=0.4.22 <0.9.0;


// when dealing with an "interface", all functions must be marked "external"

// they cannot inherit from other smart contracts
// they can only inherit from other interfaces

// they cannot declare a Constructor
// they cannot declare state variables

interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}
