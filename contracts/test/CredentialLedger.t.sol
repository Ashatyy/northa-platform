// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CredentialLedger.sol";

contract CredentialLedgerTest is Test {
    CredentialLedger public ledger;
    address public admin = address(1);
    address public universityA = address(2);
    address public employer = address(3);

    function setUp() public {
        vm.prank(admin);
        ledger = new CredentialLedger();
    }

    function testAddIssuer() public {
        vm.prank(admin);
        ledger.addIssuer(universityA);
        assertTrue(ledger.isIssuer(universityA));
    }

    function testRevertAddIssuerNotAdmin() public {
        vm.prank(universityA);
        vm.expectRevert("Not authorized: Admin only");
        ledger.addIssuer(address(3));
    }

    function testIssueCredential() public {
        vm.startPrank(admin);
        ledger.addIssuer(universityA);
        vm.stopPrank();

        bytes32 credId = keccak256(abi.encodePacked("stu123", "BSc Computer Science"));
        string memory cid = "ipfs://QmTest123";

        vm.prank(universityA);
        ledger.issueCredential(credId, cid);

        (string memory ipfsCID, address issuer, uint256 issueDate, bool isValid) = ledger.getCredential(credId);
        
        assertEq(ipfsCID, cid);
        assertEq(issuer, universityA);
        assertTrue(isValid);
        assertGt(issueDate, 0);
    }

    function testRevokeCredentialByIssuer() public {
        vm.startPrank(admin);
        ledger.addIssuer(universityA);
        vm.stopPrank();

        bytes32 credId = keccak256("test-cred");
        string memory cid = "ipfs://QmTest123";

        vm.startPrank(universityA);
        ledger.issueCredential(credId, cid);
        ledger.revokeCredential(credId);
        vm.stopPrank();

        (,,, bool isValid) = ledger.getCredential(credId);
        assertFalse(isValid);
    }

    function testRevokeCredentialByAdmin() public {
        vm.startPrank(admin);
        ledger.addIssuer(universityA);
        vm.stopPrank();

        bytes32 credId = keccak256("test-cred");
        string memory cid = "ipfs://QmTest123";

        vm.prank(universityA);
        ledger.issueCredential(credId, cid);

        vm.prank(admin);
        ledger.revokeCredential(credId);

        (,,, bool isValid) = ledger.getCredential(credId);
        assertFalse(isValid);
    }

    function testRevertRevokeByUnauth() public {
        vm.startPrank(admin);
        ledger.addIssuer(universityA);
        vm.stopPrank();

        bytes32 credId = keccak256("test-cred");
        string memory cid = "ipfs://QmTest123";

        vm.prank(universityA);
        ledger.issueCredential(credId, cid);

        vm.prank(employer); // Should fail
        vm.expectRevert("Not authorized to revoke");
        ledger.revokeCredential(credId);
    }
}
