// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

contract DDaw {
    struct Phrase {
        address owner;
        uint256 royalty;
    }

    struct Track {
        address owner;
        string[] phrases;
        uint256 cost;
        string uri;
        address nft;
    }

    mapping(string => Phrase) public phrases;
    mapping(string => Track) public tracks;

    event NewPhrase(string indexed phrase, address indexed owner, uint256 royalty);
    event NewTrack(string indexed name, string[] indexed phrases, uint256 cost);

    /// @dev Creates a new phrase.
    /// @param phrase Part of the prompt/phrase
    /// @param royalty per 1 ether
    function newPhrase(string memory phrase, uint256 royalty) external {
        require (bytes(phrase).length > 0, "Phrase cannot be empty");
        require (bytes(phrase).length < 100, "Phrase should be less than 100 characters");
        require (phrases[phrase].owner == address(0), "Phrase is already owned");
        
        phrases[phrase].owner = msg.sender;
        phrases[phrase].royalty = royalty;
        
        emit NewPhrase(phrase, msg.sender, royalty);
    }

    /// @notice _phrases is set by the user and can potentially be malicious altered by the user
    /// Possible option is to user backend service that will validate the input and then call the contract
    function newTrack(string memory _name, string[] memory _phrases, uint256 _cost, string memory _uri) external {
        require (bytes(_name).length > 0, "Track name cannot be empty");
        require (bytes(_name).length < 100, "Track name should be less than 100 characters");

        tracks[_name].cost = _cost;
        tracks[_name].owner = msg.sender;
        tracks[_name].uri = _uri;
        for (uint256 i = 0; i < _phrases.length; i++) {
            tracks[_name].phrases[i] = _phrases[i];
        }

        // TODO: Clone New Track NFT Contract

        emit NewTrack(_name, _phrases, _cost);
    }

    function buyTrack(string memory _name) external payable {
        Track memory track = tracks[_name];
        require (track.cost <= msg.value, "Insufficient msg.value");
        uint256 totalRoyalty = 0;
        for (uint256 i = 0; i < track.phrases.length; i++) {
            Phrase memory phrase = phrases[track.phrases[i]];
            uint256 royalty = track.cost * phrase.royalty  / 1 ether;
            totalRoyalty += royalty;
            payable(phrase.owner).transfer(royalty);
        }
        payable(track.owner).transfer(msg.value - totalRoyalty);
        // TODO: Mint Track NFT

        // TODO: Event
    }
}
