// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleERC721 is ERC721, Ownable {
    struct OnChainMetadata {
        string description;
        string external_url;
        string name;
        string attribute_name_comma_seprate_string;
        string attribute_value_comma_seprate_string;
    }
    uint256 private _nextTokenId;

    mapping(uint256 tokenId => OnChainMetadata) private _onChainMetadatas;

    event Minted(address to, uint256 tokenId);

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _nextTokenId = 0;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return "This ERC721 does not have tokenURI.";
    }

    function mint(
        address to,
        string memory description,
        string memory external_url,
        string memory name,
        string memory attribute_name_comma_seprate_string,
        string memory attribute_value_comma_seprate_string
    ) external onlyOwner {
        _onChainMetadatas[_nextTokenId] = OnChainMetadata(
            description,
            external_url,
            name,
            attribute_name_comma_seprate_string,
            attribute_value_comma_seprate_string
        );
        _mint(to, _nextTokenId);
        emit Minted(to, _nextTokenId);
        _nextTokenId++;
    }

    function getOnChainMetadata(
        uint256 tokenId
    ) external view returns (OnChainMetadata memory) {
        return _onChainMetadatas[tokenId];
    }
}
