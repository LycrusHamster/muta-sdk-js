# Muta SDK

The JS/TS SDK for [Muta](https://github.com/nervosnetwork/muta)(a High performance Blockchain framework). 
Allow you to interact with Muta node's GraphQL service.

## Quick Start

```shell
npm install muta-sdk
```

## Example

The following code will show

1. How to interact with `#[read]` service
2. How to sign a transaction
3. How to sendTransaction

```ts
import { Muta } from 'muta-sdk';

async function main() {
  const muta = new Muta();
  const client = muta.client();
  // get metadata from the chain
  const metadataResponse = await client.queryServiceDyn({
    method: 'get_metadata',
    payload: '',
    serviceName: 'metadata',
  });

  console.log(metadataResponse);

  // Accounts with permission to modify metadata
  const admin = Muta.accountFromPrivateKey('0x...');

  // Preparing transaction
  const tx = await client.composeTransaction({
    method: 'update_metadata',
    payload: {
      // ...
    },
    serviceName: 'metadata',
  });
  const signedTx = admin.signTransaction(tx);
  const txHash = await client.sendTransaction(signedTx);
  const receipt = await client.getReceipt(txHash);

  console.log(receipt);
}
```

## Create Service Binding

Before we create our custom binding, learn about what is a [service](https://github.com/nervosnetwork/muta-docs/blob/master/service_dev.md) in Muta.
We'll still use [AssetService](https://github.com/nervosnetwork/muta/blob/master/built-in-services/asset) as an [example](./packages/muta-service/src/binding/AssetService.ts).

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
