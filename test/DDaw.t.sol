// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";

import { DDaw } from "../src/DDaw.sol";

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract DDawTest is PRBTest, StdCheats {
    DDaw internal ddaw;

    struct Phrase {
        address owner;
        uint256 royalty;
    }

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        ddaw = new DDaw();
    }

    function test_NewPhrase() external {
        ddaw.newPhrase("Hello World", 0.05 ether);

        (address owner, uint256 royalty) = ddaw.phrases("Hello World"); 
        assertEq(owner, address(this), "owner mismatch");
        assertEq(royalty, 0.05 ether, "royalty mismatch");   
        // TODO: Event assertion    
    }

    function test_NewTrack() external {
        ddaw.newPhrase("japanses lo-fi", 0.05 ether);
        ddaw.newPhrase("guitar solo", 0.05 ether);
        // string[] memory phrases;
        // phrases[0] = "japanses lo-fi";
        // phrases[1] = "guitar solo";
        // ddaw.newTrack("kikagaku moyo", phrases, 0.1 ether);

        // uint256 a = ddaw.tracks("kikagaku moyo");
        // assertEq(t.phrases.length, 2, "phrases length mismatch");
        // assertEq(t.phrases[0], "japanses lo-fi", "phrase mismatch");
        // assertEq(t.phrases[1], "guitar solo", "phrase mismatch");
        // assertEq(t.cost, 0.1 ether, "cost mismatch");
    }
}
