pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    uint8 public a = 7; // 1 byte
    uint16 public b = 10; // 2 bytes
    address public c = 0x9916358E84c006b3419a53B351977Da6C76a74AF; // 20bytes
    bool d = true; // 1 byte
    uint64 public e = 15; // 8 bytes

    // ^ this is 32bytes for slot 0

    uint256 public f = 200; // 32bytes
    // ^ this is 32bytes for slot 1

    uint8 public g = 40; // 1 byte
     // ^ slot 2

    uint256 public h = 789; // 32bytes
    // slot 3
}
