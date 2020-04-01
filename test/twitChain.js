const TwitChain = artifacts.require("TwitChain.sol");

contract('TwitChain', ([deployer, author, tipper]) => {
  let twitChain = null;
  before(async () => {
    twitChain = await TwitChain.deployed();
  });
  describe('TwitChain Deploy Successfully', async () => {
    it("should be the address diferent to null or undefined", async () => {
      const address = await twitChain.address

      assert(address.length > 0);
      assert(address != '');
    });

    it("should has a name", async () => {
      const name = await twitChain.name();

      assert(name != '');
      assert(name.length > 0);
    });
  })

  describe('TwitChain Functions', async () => {
    let result, postCount;
    before(async () => {
      result = await twitChain.createPost('This is my first tweet', { from: author });
      postCount = await twitChain.postCount()
    });
    it('should create a post', async () => {
      
      assert.equal(postCount, 1);
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id correct');
      assert.equal(event.content, 'This is my first tweet', 'content is correct')
      assert.equal(event.tipAmount, 0, 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      // If Fail
      // await twitChain.createPost('',{ from: author }).should.be.rejected;
    });

    it('should get list of posts', async () => {
      const post = await twitChain.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id correct');
      assert.equal(post.content, 'This is my first tweet', 'content is correct')
      assert.equal(post.tipAmount, 0, 'tip amount is correct')
      assert.equal(post.author, author, 'author is correct')
    });

    it('should to allows users to tip posts', async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

      result = await twitChain.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id correct');
      assert.equal(event.content, 'This is my first tweet', 'content is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      
      // Check the author received funds
      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipAmount
      tipAmount = web3.utils.toWei('1', 'Ether');
      tipAmount = new web3.utils.BN(tipAmount);

      const expectedBalance = oldAuthorBalance.add(tipAmount);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

       // FAILURE: Tries to tip a post that does not exist
       // await twitChain.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected; 
    });
  })
  

})
