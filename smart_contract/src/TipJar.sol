// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20Permit} from "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TipJar is ERC721URIStorage, ReentrancyGuard {
    /// @notice ERC20 token used for tipping
    ERC20Permit public immutable token;

    /// @notice Mapping to track total tips per creator
    mapping(address => uint256) public creatorBalances;

    /// @notice Mapping to track registered creators
    mapping(address => bool) public isCreator;

    /// @notice Next token ID for NFTs
    uint256 public nextTokenId;

    /// @notice Base URI for minted NFTs
    string private _baseTokenURI;

    /// @dev Custom errors
    error InvalidAddress();
    error AlreadyRegistered();
    error NotRegistered();
    error InvalidAmount();

    /// @dev Events
    event CreatorRegistered(address indexed creator);
    event CreatorTipped(
        address indexed creator,
        address indexed tipper,
        uint256 amount
    );
    event NFTMinted(address indexed to, uint256 indexed tokenId);

    /// @notice Initialize ERC20 token and ERC721 name/symbol
    /// @param _token Address of the ERC20Permit token
    /// @param baseURI Base URI for NFTs
    constructor(
        address _token,
        string memory baseURI
    ) ERC721("TippaNFT", "TIPPA") {
        if (_token == address(0)) revert InvalidAddress();
        token = ERC20Permit(_token);
        _baseTokenURI = baseURI;
        nextTokenId = 1;
    }

    /// @notice Register a new creator who can receive tips
    function registerCreator(address _creator) external {
        if (_creator == address(0)) revert InvalidAddress();
        if (isCreator[_creator]) revert AlreadyRegistered();

        isCreator[_creator] = true;
        creatorBalances[_creator] = 0;
        emit CreatorRegistered(_creator);
    }

    /// @notice Tip a registered creator; mints an NFT reward to the tipper
    /// @param _creator Creator address
    /// @param _amount Amount to tip
    /// @param _deadline ERC-2612 permit deadline
    /// @param _v,_r,_s ERC-2612 signature components
    function tipCreator(
        address _creator,
        uint256 _amount,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external nonReentrant {
        if (!isCreator[_creator]) revert NotRegistered();
        if (_amount == 0) revert InvalidAmount();

        // Approve and pull tokens
        token.permit(msg.sender, address(this), _amount, _deadline, _v, _r, _s);
        token.transferFrom(msg.sender, _creator, _amount);

        // Update creator's balance
        unchecked {
            creatorBalances[_creator] += _amount;
        }

        emit CreatorTipped(_creator, msg.sender, _amount);

        // Mint an NFT to the tipper
        uint256 tokenId = nextTokenId;
        nextTokenId += 1;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(
            tokenId,
            string(abi.encodePacked(_baseTokenURI, _toString(tokenId), ".json"))
        );

        emit NFTMinted(msg.sender, tokenId);
    }

    /// @notice Owner can update the base URI for all future NFTs
    function setBaseURI(string calldata newBaseURI) external {
        // you may want to restrict this with an onlyOwner modifier
        _baseTokenURI = newBaseURI;
    }

    /// @dev Override ERC721’s baseURI hook
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /// @dev Minimal uint → string converter
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
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
