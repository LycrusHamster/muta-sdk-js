# Muta SDK(WIP)

The JS/TS SDK for [Muta](https://github.com/nervosnetwork/muta)(a High performance Blockchain framework). Allow you interact with Muta node's GraphQL service.

## Quick Start

```shell
npm install muta-sdk@next
```

## Example

Suppose the [AssetServiceTs](https://github.com/nervosnetwork/muta/blob/master/built-in-services/asset/src/lib.rs) is stable, the bellow code shows how to create a UDT(user define token) and how to transfer UDTs

1. create a default Muta Instance of Muta chain
2. generate random Mnemonic and use it as HDWallet's seed
3. derive a Account, which contains privateKey, as our account for later use
4. get a client to communicate with Muta chain thru the Node given is step 1
5. use Asset Service to create an Asset called LOVE_COIN
6. send certain asset to another address

```js
test.skip('Muta example', async t => {
  const muta = Muta.createDefaultMutaInstance();

  // get a client which plays a role to sent GraphQL rpc to the Muta chain, it like you get a web3.eth in Ethereum
  const client = muta.client();

  // use HDWallet to generate random mnemonic
  const mnemonic = Muta.hdWallet.generateMnemonic();

  // use the mnemonic to build an HDWallet
  const wallet = new Muta.hdWallet(mnemonic);

  // derive an account from the HDWallet
  const account = wallet.deriveAccount(1);

  // get AssetServiceTs with given client and accout
  // the client takes responsibility to send you query/transaction to the Muta chain or node
  // the account is as the default sender of query and the only sender of transaction which you send to Muta chain or node
  const service = new AssetServiceTs(client, account);

  // the total supply is 1314, nothing special
  const supply = 1314;

  // create an asset call LOVE_COIN with LUV symbol, supply 1314 loves totally
  const createdAsset = await service.create_asset({
    name: 'LOVE_COIN',
    supply,
    symbol: 'LUV',
  });

  // keep the asset id for later use, you should keep it carefully
  const assetId = createdAsset.response.ret.id;

  // get the balance of our account, should equal 1314
  const {
    ret: { balance },
  } = await service.get_balance({ asset_id: assetId, user: account.address });
  t.is(balance, 1314);

  // we send 520 LUVs
  const to = '0x2000000000000000000000000000000000000000';

  await service.transfer({
    asset_id: assetId,
    to,
    value: 520,
  });

  const {
    ret: { balance: balance0x2000000000000000000000000000000000000000 },
  } = await service.get_balance({
    asset_id: assetId,
    user: to,
  });
  t.is(balance0x2000000000000000000000000000000000000000, 520);
});
```

## Links

- [API Documentation](https://nervosnetwork.github.io/muta-sdk-js)
- [Muta](https://github.com/nervosnetwork/muta)

## Development

- nodejs >= 10
- typescript >= 3.7
- yarn

```shell
git clone https://github.com/nervosnetwork/muta-sdk-js
cd muta-sdk-js
yarn
yarn start
```
