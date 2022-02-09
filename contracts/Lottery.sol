// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public participants;

    constructor (){
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether, "Need to provide minimum balance");
        participants.push(msg.sender);
    }

    modifier onlyOwner(){
        require(msg.sender == manager);
        _;
    }

    function pickWinner() public onlyOwner{
        uint number = random();
        payable(participants[number]).transfer(address(this).balance);
        participants = new address[](0);
    }

    function random() public view returns (uint){
        uint number = block.timestamp % participants.length;
        return number;
    }

    function getAllParticipants() public view returns(address[] memory){
        return participants;
    }
}