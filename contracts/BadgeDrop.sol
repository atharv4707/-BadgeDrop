// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BadgeDrop
 * @dev Gasless NFT badge claimer on Base Sepolia
 * Users claim badges via UGF (Universal Gas Framework) - no ETH required
 */
contract BadgeDrop is ERC721, Ownable {
    uint256 private _nextTokenId;
    
    // Mapping: user address => badge ID => claimed status
    mapping(address => mapping(uint256 => bool)) public hasClaimed;
    
    // Events
    event BadgeClaimed(address indexed user, uint256 indexed badgeId, uint256 tokenId);

    constructor() ERC721("BadgeDrop", "BADGE") Ownable(msg.sender) {}

    /**
     * @dev Mint a badge to a user
     * Called by UGF on behalf of the user (gasless transaction)
     * @param to Address to mint the badge to
     * @param badgeId The badge type ID (1-6 for different badge types)
     */
    function mint(address to, uint256 badgeId) external {
        require(!hasClaimed[to][badgeId], "Already claimed");
        require(badgeId >= 1 && badgeId <= 6, "Invalid badge ID");
        
        hasClaimed[to][badgeId] = true;
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        emit BadgeClaimed(to, badgeId, tokenId);
    }
    
    /**
     * @dev Check if a user has claimed a specific badge
     * @param user Address to check
     * @param badgeId Badge type ID to check
     * @return bool True if the badge has been claimed
     */
    function hasClaimedBadge(address user, uint256 badgeId) external view returns (bool) {
        return hasClaimed[user][badgeId];
    }
    
    /**
     * @dev Get the total number of badges minted
     * @return uint256 Total supply of badges
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }
    
    /**
     * @dev Override tokenURI to return badge metadata
     * In production, this should return a proper IPFS or HTTP URL
     * @param tokenId Token ID to get URI for
     * @return string Token URI
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        
        // In production, implement proper metadata hosting
        // For now, return a placeholder
        return string(abi.encodePacked(
            "https://badgedrop.example.com/metadata/",
            _toString(tokenId)
        ));
    }
    
    /**
     * @dev Convert uint256 to string
     * @param value Value to convert
     * @return string String representation
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
