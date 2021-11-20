pragma solidity >=0.4.22 <0.9.0;
import './Owned.sol'; // import Owned contract
import './Logger.sol';
import './IFaucet.sol';

contract Faucet is Owned, Logger, IFaucet { // Owned is now inherited to this contract

  uint public numOfFunders;

  mapping(address => bool) private funders;
  mapping(uint => address) private lutFunders; // "Look up table Funders" 

   
  modifier withdrawLimit(uint amount) {
     require(amount <= 100000000000000000, "Cannot withdraw more than 0.1 ETH"); // includes a message if False  
     _;  
   }

  receive() external payable {}


  function example() public override pure returns(bytes32){
    return "Hello world";
  }


  function addFunds() override external payable {   
      address funder = msg.sender; 

      if(!funders[funder]){ // if this address doesn't already exist, add it to the list 
        uint index = numOfFunders++;
        funders[funder] = true; 
        lutFunders[index] = funder;
      }
  }

  //withdraws funds
  function withdraw(uint withdrawAmount) override external withdrawLimit(withdrawAmount){
    payable(msg.sender).transfer(withdrawAmount);
  }

  function getAllFunders() external view returns(address[] memory) {
    address[] memory _funders = new address[](numOfFunders);  // creates a new array, where the length equals "numOfFunders"
    // loop over the _funders array 
    for (uint i = 0; i < numOfFunders; i ++ ) {
      _funders[i] = lutFunders[i];
    }

    return _funders;
  }

  function getFunderIndex(uint index) external view returns(address) {
    return lutFunders[index];
  }

}

/*  
const instance = await Faucet.deployed()
instance.addFunds()
instance.addFunds({from: accounts[0], value: '2000000000000000000'})
instance.addFunds({from: accounts[1], value: '2000000000000000000'})
instance.getAllFunders()
instance.getFunderIndex(0)
instance.withdraw('500000000000000000', {from: accounts[1]})
*/