const { assert } = require("chai");
const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { devChains } = require("../../helper-hardhat-config");

devChains.includes(network.name)
  ? describe.skip
  : describe("FundMe Staging Tests", function () {
      let deployer;
      let fundMe;
      const sendValue = ethers.parseEther("0.1");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        //   fundMe = await ethers.getContract('FundMe', deployer)
        const myContract = await deployments.get("FundMe");
        //   console.log(myContract)
        console.log(`myContract.adress : ${myContract.address}`);
        console.log(`deployer : ${deployer}`);
        fundMe = await ethers.getContractAt(myContract.abi, myContract.address);
      });

      it("allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();

        const endingFundMeBalance = await ethers.provider.getBalance(
          await fundMe.getAddress()
        );
        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });
