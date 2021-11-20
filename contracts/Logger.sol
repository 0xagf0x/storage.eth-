pragma solidity >=0.4.22 <0.9.0;


// abstract - its a way for developer to say that "any child of this abstract contract has to implement the method(s)" 


abstract contract Logger {
    uint public testNum;

    constructor() {
        testNum = 1000;
    }

   function example() public virtual pure returns(bytes32);  // "virtual" 

   function test3() internal pure returns(uint) {  // "internal" means only this contract (or contract that inherits this) can call the function
       return 100;
   }
}
