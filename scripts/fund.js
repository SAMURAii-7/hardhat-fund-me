const { getNamedAccounts, ethers } = require("hardhat");

const main = async () => {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContractAt("FundMe", deployer);
  console.log("Funding Contract...");
  const txResponse = await fundMe.fund({ value: ethers.parseEther("0.1") });
  await txResponse.wait(1);
  console.log("Funded!");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
