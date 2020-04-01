var TwitChain = artifacts.require("./TwitChain.sol");

module.exports = function(deployer) {
  deployer.deploy(TwitChain);
};
