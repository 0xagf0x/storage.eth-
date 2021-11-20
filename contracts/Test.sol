pragma solidity >=0.4.22 <0.9.0;

contract Test {

    function test(uint testNum) external pure returns(uint) {
        
        assembly { // assembly: you can write low level code
            let _num := 4

            // load data from memory 
            let _fmp := mload(0x40)

        }

        return testNum;
    }
}
