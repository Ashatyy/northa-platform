// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredentialLedger {
    address public admin;

    struct Credential {
        string ipfsCID;
        address issuer;
        uint256 issueDate;
        bool isValid;
        bool exists;
    }

    mapping(address => bool) public isIssuer;
    mapping(bytes32 => Credential) public credentials;

    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);
    event CredentialIssued(bytes32 indexed credentialId, address indexed issuer, string ipfsCID);
    event CredentialRevoked(bytes32 indexed credentialId, address indexed revoker);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized: Admin only");
        _;
    }

    modifier onlyIssuer() {
        require(isIssuer[msg.sender], "Not authorized: Issuer only");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addIssuer(address _issuer) external onlyAdmin {
        require(_issuer != address(0), "Invalid address");
        require(!isIssuer[_issuer], "Already an issuer");
        isIssuer[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    function removeIssuer(address _issuer) external onlyAdmin {
        require(isIssuer[_issuer], "Not an issuer");
        isIssuer[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    function issueCredential(bytes32 _credentialId, string memory _ipfsCID) external onlyIssuer {
        require(!credentials[_credentialId].exists, "Credential ID already exists");
        
        credentials[_credentialId] = Credential({
            ipfsCID: _ipfsCID,
            issuer: msg.sender,
            issueDate: block.timestamp,
            isValid: true,
            exists: true
        });

        emit CredentialIssued(_credentialId, msg.sender, _ipfsCID);
    }

    function revokeCredential(bytes32 _credentialId) external {
        require(credentials[_credentialId].exists, "Credential does not exist");
        require(credentials[_credentialId].isValid, "Credential already revoked");
        require(
            msg.sender == admin || msg.sender == credentials[_credentialId].issuer, 
            "Not authorized to revoke"
        );

        credentials[_credentialId].isValid = false;
        emit CredentialRevoked(_credentialId, msg.sender);
    }

    function getCredential(bytes32 _credentialId) external view returns (string memory, address, uint256, bool) {
        require(credentials[_credentialId].exists, "Credential does not exist");
        Credential memory cred = credentials[_credentialId];
        return (cred.ipfsCID, cred.issuer, cred.issueDate, cred.isValid);
    }
}
