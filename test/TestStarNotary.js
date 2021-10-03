const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]});
    let star = await instance.tokenIdToStarInfo.call(tokenId);
    assert.equal(star, 'Awesome Star!')
});

// it('lets user1 put up their star for sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let starId = 2;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     assert.equal(await instance.starsForSale.call(starId), starPrice);
// });

// it('lets user1 get the funds after the sale', async function() {
//     // increase timeout as the function is taking more than 2 seconds
//     this.timeout(5000);

//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 3;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");

//     // set gasPrice to 0 to avoid accounting for gas expenses in calculations
//     await instance.createStar('awesome star', starId, {from: user1, gasPrice: 0});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1, gasPrice: 0});

//     // approve user2 for buying star
//     await instance.approve(user2, starId, {from: user1, gasPrice: 0});

//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
//     await instance.buyStar(starId, {from: user2, value: balance, gasPrice: 0});
//     let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
//     let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
//     let value2 = Number(balanceOfUser1AfterTransaction);
//     assert.equal(value1, value2);
// });

// it('lets user2 buy a star, if it is put up for sale', async function() {
//     this.timeout(5000);

//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 4;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1, gasPrice: 0});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1, gasPrice: 0});

//     // approve user2 for buying star
//     await instance.approve(user2, starId, {from: user1, gasPrice: 0});

//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
//     await instance.buyStar(starId, {from: user2, value: balance});
//     assert.equal(await instance.ownerOf.call(starId), user2);
// });

// it('lets user2 buy a star and decreases its balance in ether', async function() {
//     this.timeout(5000);
    
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 5;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1, gasPrice: 0});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1, gasPrice: 0});
    
//     // approve user2 for buying star
//     await instance.approve(user2, starId, {from: user1, gasPrice: 0});

//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
//     const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);

//     await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
//     const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
//     let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
//     assert.equal(value, starPrice);
// });

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let tokenId = 11;
    let instance = await StarNotary.deployed();
    
    assert.equal(await instance.name(), 'StarNotary');
    assert.equal(await instance.symbol(), 'SNS');
});

it('lets 2 users exchange stars', async function() {
    this.timeout(5000);

    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    let instance = await StarNotary.deployed();

    // Should result in exception as token ids don't exist
    // await instance.exchangeStars(1, 2);

    let tokenId1 = 21;
    await instance.createStar('Star1', tokenId1, {from: accounts[0]});

    let tokenId2 = 22;
    await instance.createStar('Star2', tokenId2, {from: accounts[1]});

    // Owner1 approves owner2 and vice-versa for exchange
    await instance.approve(accounts[1], tokenId1, {from: accounts[0]});
    await instance.approve(accounts[0], tokenId2, {from: accounts[1]});
    
    await instance.exchangeStars(tokenId1, tokenId2);

    assert.equal(await instance.ownerOf(tokenId2), accounts[0]);
    assert.equal(await instance.ownerOf(tokenId1), accounts[1]);
});

it('lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
});

it('lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    // 2. Call your method lookUptokenIdToStarInfo
    // 3. Verify if you Star name is the same

    let tokenId = 1331;
    let instance = await StarNotary.deployed();

    await instance.createStar('Lookup Star!', tokenId, {from: accounts[0]});

    let starName = await instance.lookUptokenIdToStarInfo(tokenId);
    
    assert.equal(starName, 'Lookup Star!');
});